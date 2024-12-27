import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch API keys from the database
    const { data: apiKeys, error: apiKeysError } = await supabaseClient
      .from('api_keys')
      .select('*')
      .limit(1)
      .single();

    if (apiKeysError) {
      console.error('Error fetching API keys:', apiKeysError);
      throw new Error('Failed to fetch API keys');
    }

    if (!apiKeys.openai_key && !apiKeys.openrouter_key) {
      throw new Error('No API keys configured. Please configure either OpenAI or OpenRouter API key.');
    }

    const { messages } = await req.json();
    console.log('Processing chat request with messages:', messages);

    // Try OpenAI first if the key exists
    if (apiKeys.openai_key) {
      try {
        console.log('Attempting to use OpenAI API');
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKeys.openai_key}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4-turbo-preview',
            messages: messages,
            max_tokens: 1024,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          console.error('OpenAI API error:', error);
          // If OpenAI fails and we have OpenRouter key, we'll try that next
          if (apiKeys.openrouter_key) {
            throw new Error('OpenAI failed, trying OpenRouter');
          }
          throw new Error(error.error?.message || 'Error calling OpenAI API');
        }

        const data = await response.json();
        console.log('Successfully received response from OpenAI');

        return new Response(
          JSON.stringify({ content: data.choices[0].message.content }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        // Only throw if we don't have OpenRouter as backup
        if (!apiKeys.openrouter_key) {
          throw error;
        }
        console.log('OpenAI failed, falling back to OpenRouter:', error);
      }
    }

    // Try OpenRouter if we have the key (either as primary or as fallback)
    if (apiKeys.openrouter_key) {
      console.log('Using OpenRouter API');
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKeys.openrouter_key}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-2-70b-chat',
          messages: messages,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('OpenRouter API error:', error);
        throw new Error(error.error?.message || 'Error calling OpenRouter API');
      }

      const data = await response.json();
      console.log('Successfully received response from OpenRouter');

      return new Response(
        JSON.stringify({ content: data.choices[0].message.content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});