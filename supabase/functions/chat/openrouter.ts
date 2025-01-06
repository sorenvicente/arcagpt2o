import { corsHeaders, defaultConfig } from './config.ts';

export async function callOpenRouter(apiKey: any, messages: any[], temperature: number) {
  console.log('🔄 Iniciando chamada OpenRouter...');
  try {
    if (!apiKey.openrouter_key) {
      console.log('❌ OpenRouter key não encontrada');
      return null;
    }

    const model = apiKey.selected_openrouter_model || defaultConfig.defaultOpenRouterModel;
    console.log(`📝 Enviando requisição para OpenRouter usando modelo: ${model}`);
    
    const requestBody = {
      model: model,
      messages: messages,
      max_tokens: defaultConfig.max_tokens,
      temperature: temperature,
    };
    console.log('📦 Corpo da requisição:', JSON.stringify(requestBody, null, 2));

    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.openrouter_key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': Deno.env.get('SUPABASE_URL') || 'http://localhost:5173',
        'X-Title': 'Lovable Chat App',
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await openRouterResponse.json();
    console.log(`📊 OpenRouter status: ${openRouterResponse.status}`);

    if (!openRouterResponse.ok) {
      console.error('❌ Erro OpenRouter:', responseData);
      return null;
    }

    console.log('✨ OpenRouter respondeu com sucesso');
    const content = responseData.choices[0].message.content;
    console.log('📝 Conteúdo da resposta:', content.substring(0, 100) + '...');

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('❌ Erro ao chamar OpenRouter:', error);
    return null;
  }
}