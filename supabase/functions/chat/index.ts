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
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verify the JWT token
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      console.error('Auth error:', authError);
      throw new Error('Invalid authentication');
    }

    // Fetch API keys
    const { data: apiKeys, error: apiKeysError } = await supabaseClient
      .from('api_keys')
      .select('*')
      .limit(1)
      .single();

    if (apiKeysError) {
      console.error('Error fetching API keys:', apiKeysError);
      throw new Error('Failed to fetch API keys');
    }

    // Validate API keys
    if (!apiKeys.openai_key && !apiKeys.openrouter_key) {
      throw new Error('Por favor, configure pelo menos uma chave API (OpenAI ou OpenRouter) na página de Chaves API.');
    }

    const { messages } = await req.json();
    console.log('Processing chat request with messages:', messages);

    let lastError = null;

    // Try OpenRouter first if key exists
    if (apiKeys.openrouter_key) {
      try {
        console.log('Attempting OpenRouter API call...');
        
        const openRouterBody = {
          model: 'meta-llama/llama-3.1-405b-instruct:free',
          messages: messages,
          max_tokens: 1000,
        };

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
          console.error('OpenRouter API error:', {
            status: response.status,
            response: errorText
          });
          throw new Error(`Erro OpenRouter: ${errorText}`);
        }

        const data = await response.json();
        
        if (!data.choices?.[0]?.message?.content) {
          throw new Error('Resposta inválida do OpenRouter');
        }

        console.log('OpenRouter API success');

        return new Response(
          JSON.stringify({ content: data.choices[0].message.content }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('OpenRouter API failed:', error);
        lastError = error;
        // Only throw if OpenAI key is not available as fallback
        if (!apiKeys.openai_key) {
          throw error;
        }
        console.log('Falling back to OpenAI...');
      }
    }

    // Try OpenAI if OpenRouter failed or wasn't available
    if (apiKeys.openai_key) {
      try {
        console.log('Attempting OpenAI API call...');
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
          
          if (error.error?.code === 'insufficient_quota') {
            throw new Error('Cota do OpenAI excedida. Por favor, verifique seus detalhes de faturamento ou tente usar o OpenRouter.');
          }
          
          throw new Error(error.error?.message || 'Erro ao chamar a API do OpenAI');
        }

        const data = await response.json();
        
        if (!data.choices?.[0]?.message?.content) {
          throw new Error('Resposta inválida do OpenAI');
        }

        console.log('OpenAI API success');

        return new Response(
          JSON.stringify({ content: data.choices[0].message.content }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('OpenAI API failed:', error);
        // Se tivemos um erro anterior do OpenRouter, incluímos na mensagem
        const errorMessage = lastError ? 
          `Ambos os serviços falharam. OpenRouter: ${lastError.message}, OpenAI: ${error.message}` :
          error.message;
        throw new Error(errorMessage);
      }
    }

    throw new Error('Nenhum serviço de API disponível');

  } catch (error) {
    console.error('Chat function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Por favor, verifique suas chaves API e cotas na página de Chaves API.'
      }),
      { 
        status: error.message.includes('Invalid authentication') ? 401 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});