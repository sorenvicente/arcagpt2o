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
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Sem cabeçalho de autorização');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verify user authentication
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      console.error('Erro de autenticação:', authError);
      throw new Error('Autenticação inválida');
    }

    // Fetch most recent API key
    const { data: apiKeys, error: apiKeysError } = await supabaseClient
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (apiKeysError) {
      console.error('Erro ao buscar chaves API:', apiKeysError);
      throw new Error('Falha ao buscar chaves API');
    }

    if (!apiKeys?.length) {
      throw new Error('Nenhuma chave API configurada');
    }

    const apiKey = apiKeys[0];
    
    if (!apiKey.openai_key && !apiKey.openrouter_key) {
      throw new Error('Por favor, configure pelo menos uma chave API (OpenAI ou OpenRouter) na página de Chaves API.');
    }

    const { messages, temperature = 0.7 } = await req.json();
    console.log('Processando requisição de chat com mensagens:', messages);

    // Try OpenRouter first if configured
    if (apiKey.openrouter_key) {
      console.log('Tentando usar OpenRouter...');
      try {
        const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey.openrouter_key}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': Deno.env.get('SUPABASE_URL') || 'http://localhost:5173',
            'X-Title': 'Lovable Chat App',
          },
          body: JSON.stringify({
            model: apiKey.selected_openrouter_model || 'anthropic/claude-2',
            messages: messages,
            max_tokens: 1000,
            temperature: temperature,
          }),
        });

        if (openRouterResponse.ok) {
          const data = await openRouterResponse.json();
          return new Response(
            JSON.stringify({ content: data.choices[0].message.content }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        console.error('OpenRouter falhou, tentando OpenAI...');
      } catch (error) {
        console.error('Erro ao chamar OpenRouter:', error);
      }
    }

    // Try OpenAI if configured
    if (apiKey.openai_key) {
      console.log('Tentando usar OpenAI...');
      // Remove OpenAI key validation since we want to support different key formats
      const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey.openai_key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: apiKey.selected_openai_model || 'gpt-4-1106-preview',
          messages: messages,
          max_tokens: 1024,
          temperature: temperature,
        }),
      });

      if (!openAIResponse.ok) {
        const error = await openAIResponse.json();
        console.error('Erro na API do OpenAI:', error);
        throw new Error(error.error?.message || 'Erro ao chamar a API do OpenAI');
      }

      const data = await openAIResponse.json();
      return new Response(
        JSON.stringify({ content: data.choices[0].message.content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    throw new Error('Nenhuma chave API válida configurada');

  } catch (error) {
    console.error('Erro na função de chat:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Por favor, verifique suas chaves API e cotas na página de Chaves API.'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});