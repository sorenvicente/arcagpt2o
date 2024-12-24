import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()

    // Get API keys from environment
    const openAiApiKey = Deno.env.get('OPENAI_API_KEY')
    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY')
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')

    console.log('Available APIs:', {
      openai: !!openAiApiKey,
      openRouter: !!openRouterApiKey,
      anthropic: !!anthropicApiKey
    })

    // Try OpenAI first if available
    if (openAiApiKey) {
      console.log('Using OpenAI API')
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: messages,
          max_tokens: 1024,
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        console.error('OpenAI API error:', data.error)
        throw new Error(data.error?.message || 'Error calling OpenAI API')
      }

      return new Response(
        JSON.stringify({ content: data.choices[0].message.content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } 
    
    // Try OpenRouter if available
    if (openRouterApiKey) {
      console.log('Using OpenRouter API')
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openRouterApiKey}`,
          'HTTP-Referer': 'https://your-site.com',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-sonnet',
          messages: messages,
          max_tokens: 1024,
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        console.error('OpenRouter API error:', data.error)
        throw new Error(data.error?.message || 'Error calling OpenRouter API')
      }

      return new Response(
        JSON.stringify({ content: data.choices[0].message.content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // If no API keys are configured, throw a more descriptive error
    throw new Error('Nenhuma chave API configurada. Por favor, configure pelo menos uma chave API (OpenAI ou OpenRouter) nas configurações.')

  } catch (error) {
    console.error('Error in chat function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})