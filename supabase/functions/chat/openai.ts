import { corsHeaders, defaultConfig } from './config.ts';

export async function callOpenAI(apiKey: any, messages: any[], temperature: number) {
  console.log('🔄 Iniciando chamada OpenAI...');
  try {
    if (!apiKey.openai_key) {
      console.log('❌ OpenAI key não encontrada');
      throw new Error('OpenAI key não configurada');
    }

    const model = apiKey.selected_openai_model || defaultConfig.defaultOpenAIModel;
    console.log(`📝 Enviando requisição para OpenAI usando modelo: ${model}`);
    
    const requestBody = {
      model: model,
      messages: messages,
      max_tokens: defaultConfig.max_tokens,
      temperature: temperature,
    };
    console.log('📦 Corpo da requisição:', JSON.stringify(requestBody, null, 2));

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.openai_key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await openaiResponse.json();
    console.log(`📊 OpenAI status: ${openaiResponse.status}`);

    if (!openaiResponse.ok) {
      console.error('❌ Erro OpenAI:', responseData);
      throw new Error(responseData.error?.message || 'Erro ao chamar OpenAI');
    }

    console.log('✨ OpenAI respondeu com sucesso');
    const content = responseData.choices[0].message.content;
    console.log('📝 Conteúdo da resposta:', content.substring(0, 100) + '...');

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('❌ Erro ao chamar OpenAI:', error);
    throw error;
  }
}