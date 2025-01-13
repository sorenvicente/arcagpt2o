import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { callOpenAI } from './openai.ts';
import { handleOpenRouterRequest } from './openrouter.ts';
import { corsHeaders } from './config.ts';

console.log('🚀 Chat Edge Function iniciada');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { messages, temperature = 0.7 } = await req.json();
    console.log('📨 Requisição recebida:', { 
      messagesCount: messages?.length 
    });

    // Fetch API keys from database
    const { data: apiKeys, error: apiKeysError } = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/rest/v1/api_keys?select=*&order=created_at.desc&limit=1`,
      {
        headers: {
          'apikey': Deno.env.get('SUPABASE_ANON_KEY') || '',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
        },
      }
    ).then(res => res.json());

    if (apiKeysError) {
      console.error('❌ Erro ao buscar chaves API:', apiKeysError);
      throw new Error('Falha ao buscar chaves API');
    }

    const apiKey = apiKeys[0];
    if (!apiKey) {
      throw new Error('Nenhuma chave API configurada');
    }

    // Check which API keys are available and their selected models
    const hasOpenAI = apiKey.openai_key && apiKey.selected_openai_model;
    const hasOpenRouter = apiKey.openrouter_key && apiKey.selected_openrouter_model;

    if (!hasOpenAI && !hasOpenRouter) {
      throw new Error('É necessário configurar pelo menos uma chave API (OpenAI ou OpenRouter)');
    }

    // Prefer OpenAI if available, otherwise use OpenRouter
    if (hasOpenAI) {
      console.log('🔄 Usando OpenAI');
      return await callOpenAI(apiKey.openai_key, messages, temperature);
    } else if (hasOpenRouter) {
      console.log('🔄 Usando OpenRouter');
      const openRouterReq = new Request(req.url, {
        method: 'POST',
        headers: req.headers,
        body: JSON.stringify({
          openrouter_key: apiKey.openrouter_key,
          model: apiKey.selected_openrouter_model,
          messages
        })
      });
      return await handleOpenRouterRequest(openRouterReq);
    }

    throw new Error('Configuração de API inválida');

  } catch (error: any) {
    console.error('❌ Erro no processamento:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'Erro interno no servidor',
        details: error.toString()
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});