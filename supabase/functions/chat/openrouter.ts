import { corsHeaders } from './config.ts';

interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function handleOpenRouterRequest(req: Request) {
  console.log('🔄 Iniciando requisição OpenRouter...');
  
  try {
    const { openrouter_key, model, messages } = await req.json();
    console.log(`🤖 Modelo selecionado: ${model}`);

    if (!openrouter_key) {
      throw new Error('OpenRouter key não configurada');
    }

    // Primeiro, vamos verificar os créditos disponíveis
    const creditsResponse = await fetch('https://openrouter.ai/api/v1/auth/key', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${openrouter_key}`,
        'HTTP-Referer': 'https://arcagpt.lovable.dev',
        'X-Title': 'ArcaGPT'
      }
    });

    if (!creditsResponse.ok) {
      console.error('❌ Erro ao verificar créditos OpenRouter:', await creditsResponse.text());
      throw new Error('Falha ao verificar créditos OpenRouter');
    }

    const creditsData = await creditsResponse.json();
    console.log('💰 Créditos OpenRouter disponíveis:', creditsData.credits);

    // Se temos créditos, prosseguir com a requisição
    console.log('📝 Enviando requisição para OpenRouter');

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openrouter_key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://arcagpt.lovable.dev',
        'X-Title': 'ArcaGPT'
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
      }),
    });

    if (!response.ok) {
      console.error('❌ Erro na resposta OpenRouter:', await response.text());
      throw new Error(`OpenRouter retornou status ${response.status}`);
    }

    const data = await response.json() as OpenRouterResponse;
    console.log('✅ Resposta OpenRouter recebida com sucesso');

    return new Response(
      JSON.stringify({ content: data.choices[0]?.message?.content }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error: any) {
    console.error('❌ Erro ao processar requisição OpenRouter:', error);
    throw error;
  }
}