import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from './config.ts';
import { authenticateUser, getApiKeys } from './auth.ts';
import { callOpenRouter } from './openrouter.ts';
import { callOpenAI } from './openai.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { supabaseClient } = await authenticateUser(req.headers.get('Authorization'));
    const apiKey = await getApiKeys(supabaseClient);
    
    const { messages, temperature = 0.7 } = await req.json();
    console.log('Processando requisição de chat com mensagens:', messages);

    // Try OpenRouter first if configured
    if (apiKey.openrouter_key) {
      const openRouterResponse = await callOpenRouter(apiKey, messages, temperature);
      if (openRouterResponse) {
        return openRouterResponse;
      }
      console.error('OpenRouter falhou, tentando OpenAI...');
    }

    // Try OpenAI if configured
    if (apiKey.openai_key) {
      return await callOpenAI(apiKey, messages, temperature);
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