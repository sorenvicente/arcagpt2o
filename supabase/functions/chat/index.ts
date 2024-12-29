import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

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

    // Try OpenRouter first if key exists
    if (apiKeys.openrouter_key) {
      try {
        console.log('Attempting to use OpenRouter API with Llama 3.1 405B');
        
        const openRouterBody = {
          model: 'meta-llama/llama-3.1-405b-instruct:free',
          messages: messages,
          max_tokens: 1000,
        };
        
        console.log('OpenRouter request body:', JSON.stringify(openRouterBody));

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKeys.openrouter_key}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': Deno.env.get('SUPABASE_URL') || 'http://localhost:5173',
            'X-Title': 'Lovable Chat App',
          },
          body: JSON.stringify(openRouterBody),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('OpenRouter API error status:', response.status);
          console.error('OpenRouter API error response:', errorText);
          throw new Error(`OpenRouter API error: ${errorText}`);
        }

        const data = await response.json();
        console.log('Successfully received response from OpenRouter:', data);

        return new Response(
          JSON.stringify({ content: data.choices[0].message.content }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('OpenRouter error:', error);
        // Only throw if we don't have OpenAI as backup
        if (!apiKeys.openai_key) {
          throw new Error(`OpenRouter error: ${error.message}`);
        }
        console.log('OpenRouter failed, falling back to OpenAI');
      }
    }

    // Only try OpenAI if we have a key and OpenRouter failed or isn't configured
    if (apiKeys.openai_key) {
      console.log('Attempting to use OpenAI API');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKeys.openai_key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4-1106-preview',
          messages: messages,
          max_tokens: 1024,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('OpenAI API error:', error);
        throw new Error(error.error?.message || 'Error calling OpenAI API');
      }

      const data = await response.json();
      console.log('Successfully received response from OpenAI');

      return new Response(
        JSON.stringify({ content: data.choices[0].message.content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    throw new Error('No working API service available');

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'If using OpenAI, please check your API key quota. If using OpenRouter, verify your API key is valid.'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});