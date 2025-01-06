import { OpenAIStream } from './openai';
import { corsHeaders } from './config';

interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function handleOpenRouterRequest(req: Request, apiKey: string, model: string) {
  console.log('🔄 Iniciando requisição OpenRouter...');
  console.log(`🤖 Modelo selecionado: ${model}`);

  try {
    // Primeiro, vamos verificar os créditos disponíveis
    const creditsResponse = await fetch('https://openrouter.ai/api/v1/auth/key', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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

    if (creditsData.credits <= 0) {
      console.error('❌ Sem créditos OpenRouter disponíveis');
      throw new Error('Sem créditos OpenRouter disponíveis');
    }

    // Se temos créditos, prosseguir com a requisição
    const body = await req.json();
    console.log('📝 Corpo da requisição:', {
      model,
      messages: body.messages.length + ' mensagens',
      firstMessage: body.messages[0]?.content.slice(0, 100) + '...'
    });

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://arcagpt.lovable.dev',
        'X-Title': 'ArcaGPT'
      },
      body: JSON.stringify({
        model: model,
        messages: body.messages,
      }),
    });

    if (!response.ok) {
      console.error('❌ Erro na resposta OpenRouter:', await response.text());
      throw new Error(`OpenRouter retornou status ${response.status}`);
    }

    const data = await response.json() as OpenRouterResponse;
    console.log('✅ Resposta OpenRouter recebida:', {
      id: data.id,
      content: data.choices[0]?.message?.content?.slice(0, 100) + '...'
    });

    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });

  } catch (error: any) {
    console.error('❌ Erro ao processar requisição OpenRouter:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'Erro ao processar requisição OpenRouter',
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
}