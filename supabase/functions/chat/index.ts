import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { handleOpenAIRequest } from './openai.ts';
import { handleOpenRouterRequest } from './openrouter.ts';
import { corsHeaders } from './config.ts';

console.log('🚀 Chat Edge Function iniciada');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { openai_key, openrouter_key, model, messages } = await req.json();
    console.log('📨 Requisição recebida:', { 
      hasOpenAIKey: !!openai_key,
      hasOpenRouterKey: !!openrouter_key,
      model,
      messagesCount: messages?.length 
    });

    // Verificar se temos as chaves necessárias
    if (!openai_key && !openrouter_key) {
      console.error('❌ Nenhuma chave API fornecida');
      throw new Error('É necessário fornecer pelo menos uma chave API (OpenAI ou OpenRouter)');
    }

    // Verificar se o modelo foi especificado
    if (!model) {
      console.error('❌ Nenhum modelo especificado');
      throw new Error('É necessário especificar um modelo');
    }

    // Determinar qual serviço usar baseado no modelo e chaves disponíveis
    const isOpenRouterModel = model.includes('/') || model.includes('anthropic') || model.includes('claude');
    
    if (isOpenRouterModel) {
      if (!openrouter_key) {
        console.error('❌ Chave OpenRouter necessária para este modelo');
        throw new Error('Chave OpenRouter é necessária para este modelo');
      }
      console.log('🔄 Redirecionando para OpenRouter');
      return await handleOpenRouterRequest(req, openrouter_key, model);
    } else {
      if (!openai_key) {
        console.error('❌ Chave OpenAI necessária para este modelo');
        throw new Error('Chave OpenAI é necessária para este modelo');
      }
      console.log('🔄 Redirecionando para OpenAI');
      return await handleOpenAIRequest(req, openai_key, model);
    }

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