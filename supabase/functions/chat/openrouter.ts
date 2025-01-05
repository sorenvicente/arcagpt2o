import { corsHeaders, defaultConfig } from './config.ts';

export async function callOpenRouter(apiKey: any, messages: any[], temperature: number) {
  console.log('Tentando usar OpenRouter...');
  try {
    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.openrouter_key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': Deno.env.get('SUPABASE_URL') || 'http://localhost:5173',
        'X-Title': 'Lovable Chat App',
      },
      body: JSON.stringify({
        model: apiKey.selected_openrouter_model || defaultConfig.defaultOpenRouterModel,
        messages: messages,
        max_tokens: defaultConfig.max_tokens,
        temperature: temperature,
      }),
    });

    if (openRouterResponse.ok) {
      const data = await openRouterResponse.json();
      return new Response(
        JSON.stringify({ content: data.choices[0].message.content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    return null;
  } catch (error) {
    console.error('Erro ao chamar OpenRouter:', error);
    return null;
  }
}