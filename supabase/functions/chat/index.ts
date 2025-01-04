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

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      console.error('Erro de autenticação:', authError);
      throw new Error('Autenticação inválida');
    }

    const { data: apiKeys, error: apiKeysError } = await supabaseClient
      .from('api_keys')
      .select('*')
      .limit(1)
      .single();

    if (apiKeysError) {
      console.error('Erro ao buscar chaves API:', apiKeysError);
      throw new Error('Falha ao buscar chaves API');
    }

    if (!apiKeys.openai_key && !apiKeys.openrouter_key) {
      throw new Error('Por favor, configure pelo menos uma chave API (OpenAI ou OpenRouter) na página de Chaves API.');
    }

    const { messages, temperature = 0.7 } = await req.json();
    console.log('Processando requisição de chat com mensagens:', messages);

    // Função auxiliar para tentar a chamada OpenAI
    const tryOpenAI = async () => {
      if (!apiKeys.openai_key) return null;
      
      console.log('Tentando chamada à API do OpenAI...');
      const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKeys.openai_key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4-1106-preview',
          messages: messages,
          max_tokens: 1024,
          temperature: temperature,
        }),
      });

      if (!openAIResponse.ok) {
        const error = await openAIResponse.json();
        console.error('Erro na API do OpenAI:', error);
        
        if (error.error?.code === 'insufficient_quota') {
          throw new Error('Sua cota da OpenAI foi excedida. Por favor, verifique seu saldo ou use uma chave OpenRouter.');
        }
        
        throw new Error(error.error?.message || 'Erro ao chamar a API do OpenAI');
      }

      const data = await openAIResponse.json();
      return data.choices?.[0]?.message?.content;
    };

    // Função auxiliar para tentar a chamada OpenRouter
    const tryOpenRouter = async () => {
      if (!apiKeys.openrouter_key) return null;
      
      console.log('Tentando chamada à API do OpenRouter...');
      const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKeys.openrouter_key}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': Deno.env.get('SUPABASE_URL') || 'http://localhost:5173',
          'X-Title': 'Lovable Chat App',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-405b-instruct:free',
          messages: messages,
          max_tokens: 1000,
          temperature: temperature,
        }),
      });

      if (!openRouterResponse.ok) {
        const errorText = await openRouterResponse.text();
        console.error('Erro na API do OpenRouter:', {
          status: openRouterResponse.status,
          response: errorText
        });
        throw new Error(`Erro na API do OpenRouter: ${errorText}`);
      }

      const data = await openRouterResponse.json();
      return data.choices?.[0]?.message?.content;
    };

    let content = null;

    // Se tiver chave OpenAI configurada, tenta usar OpenAI
    if (apiKeys.openai_key) {
      try {
        content = await tryOpenAI();
      } catch (error) {
        console.error('Erro ao tentar OpenAI:', error);
        if (error.message.includes('cota')) {
          throw error; // Propaga o erro de cota para o usuário
        }
      }
    }
    // Se não tiver OpenAI ou deu erro (exceto cota), tenta OpenRouter se configurado
    else if (apiKeys.openrouter_key) {
      try {
        content = await tryOpenRouter();
      } catch (error) {
        console.error('Erro ao tentar OpenRouter:', error);
        throw error;
      }
    }

    if (!content) {
      throw new Error('Nenhum serviço de API disponível ou todas as tentativas falharam. Por favor, verifique suas chaves API.');
    }

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

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