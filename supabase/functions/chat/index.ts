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
    console.log('🚀 Iniciando nova requisição de chat...');
    
    const { supabaseClient } = await authenticateUser(req.headers.get('Authorization'));
    console.log('✅ Usuário autenticado com sucesso');
    
    const apiKey = await getApiKeys(supabaseClient);
    if (!apiKey) {
      console.error('❌ Nenhuma chave API encontrada');
      throw new Error('Por favor, configure suas chaves API na página de Configurações.');
    }
    console.log('✅ Chaves API carregadas com sucesso');

    const { messages, temperature = 0.7 } = await req.json();
    console.log(`📝 Processando ${messages.length} mensagens com temperatura ${temperature}`);

    // Tenta OpenRouter primeiro se configurado
    if (apiKey.openrouter_key) {
      try {
        console.log('🔄 Tentando OpenRouter primeiro...');
        const openRouterResponse = await callOpenRouter(apiKey, messages, temperature);
        if (openRouterResponse) {
          console.log('✨ OpenRouter respondeu com sucesso');
          return openRouterResponse;
        }
      } catch (error) {
        console.error('⚠️ OpenRouter falhou:', error);
      }
      console.log('↪️ OpenRouter falhou, tentando OpenAI...');
    }

    // Tenta OpenAI se OpenRouter falhou ou não está configurado
    if (apiKey.openai_key) {
      try {
        console.log('🔄 Tentando OpenAI...');
        return await callOpenAI(apiKey, messages, temperature);
      } catch (error) {
        console.error('❌ OpenAI falhou:', error);
        throw error;
      }
    }

    throw new Error('Nenhuma chave API válida configurada');

  } catch (error) {
    console.error('❌ Erro na função de chat:', error);
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