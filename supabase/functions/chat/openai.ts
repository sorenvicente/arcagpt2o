import { corsHeaders, defaultConfig } from './config.ts';

export async function callOpenAI(apiKey: any, messages: any[], temperature: number) {
  console.log('Tentando usar OpenAI...');
  
  if (!apiKey.openai_key) {
    throw new Error('OpenAI API key não configurada');
  }

  try {
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.openai_key.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: apiKey.selected_openai_model || defaultConfig.defaultOpenAIModel,
        messages: messages,
        max_tokens: defaultConfig.max_tokens,
        temperature: temperature,
      }),
    });

    if (!openAIResponse.ok) {
      const error = await openAIResponse.json();
      console.error('Erro na API do OpenAI:', error);
      throw new Error(error.error?.message || 'Erro ao chamar a API do OpenAI');
    }

    const data = await openAIResponse.json();
    return new Response(
      JSON.stringify({ content: data.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erro ao chamar OpenAI:', error);
    throw error;
  }
}