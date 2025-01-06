import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { authenticateUser, getApiKeys } from './auth.ts';
import { corsHeaders } from './config.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { supabaseClient } = await authenticateUser(req.headers.get('Authorization'));
    const apiKey = await getApiKeys(supabaseClient);
    
    const { messages, temperature = 0.7 } = await req.json();
    console.log('Processando requisição de chat com mensagens:', messages);

    // Primeiro tenta usar OpenRouter se configurado
    if (apiKey.openrouter_key?.trim()) {
      try {
        console.log('Tentando usar OpenRouter com modelo:', apiKey.selected_openrouter_model);
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey.openrouter_key.trim()}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': Deno.env.get('SUPABASE_URL') || 'http://localhost:5173',
            'X-Title': 'Lovable Chat App',
          },
          body: JSON.stringify({
            model: apiKey.selected_openrouter_model || 'anthropic/claude-2',
            messages: messages,
            temperature: temperature,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return new Response(
            JSON.stringify({ content: data.choices[0].message.content }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        } else {
          const error = await response.json();
          console.error('Erro na resposta do OpenRouter:', error);
          throw new Error(error.error?.message || 'Erro ao chamar a API do OpenRouter');
        }
      } catch (error) {
        console.error('OpenRouter falhou:', error);
      }
      console.log('OpenRouter falhou, tentando OpenAI...');
    }

    // Tenta OpenAI se configurado
    if (apiKey.openai_key?.trim()) {
      try {
        console.log('Tentando usar OpenAI com modelo:', apiKey.selected_openai_model);
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey.openai_key.trim()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: apiKey.selected_openai_model || 'gpt-4',
            messages: messages,
            temperature: temperature,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          console.error('Erro na API do OpenAI:', error);
          throw new Error(error.error?.message || 'Erro ao chamar a API do OpenAI');
        }

        const data = await response.json();
        return new Response(
          JSON.stringify({ content: data.choices[0].message.content }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('OpenAI falhou:', error);
        throw error;
      }
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