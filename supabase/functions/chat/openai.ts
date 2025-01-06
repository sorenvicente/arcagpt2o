import { corsHeaders, defaultConfig } from './config.ts';

export async function callOpenAI(apiKey: any, messages: any[], temperature: number) {
  console.log('Tentando usar OpenAI...');
  try {
    if (!apiKey.openai_key) {
      console.log('OpenAI key não encontrada');
      throw new Error('OpenAI key não configurada');
    }

    console.log('Enviando requisição para OpenAI com modelo:', apiKey.selected_openai_model);
    
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.openai_key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: apiKey.selected_openai_model || defaultConfig.defaultOpenAIModel,
        messages: messages,
        max_tokens: defaultConfig.max_tokens,
        temperature: temperature,
      }),
    });

    const responseData = await openaiResponse.json();
    console.log('OpenAI status:', openaiResponse.status);

    if (!openaiResponse.ok) {
      console.error('Erro OpenAI:', responseData);
      throw new Error(responseData.error?.message || 'Erro ao chamar OpenAI');
    }

    console.log('OpenAI respondeu com sucesso');
    return new Response(
      JSON.stringify({ content: responseData.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erro ao chamar OpenAI:', error);
    throw error;
  }
}