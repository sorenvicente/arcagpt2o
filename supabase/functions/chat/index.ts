import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { messages, selectedModel } = await req.json()

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Fetch API keys from database
    const { data: apiKeys, error: fetchError } = await supabase
      .from('api_keys')
      .select('*')
      .limit(1)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching API keys:', fetchError)
      throw new Error('Error fetching API keys')
    }

    const openAiApiKey = apiKeys?.openai_key
    const openRouterApiKey = apiKeys?.openrouter_key

    console.log('Selected model:', selectedModel)
    console.log('Available APIs:', {
      openai: !!openAiApiKey,
      openRouter: !!openRouterApiKey,
    })

    // Handle OpenAI models
    if (selectedModel === 'gpt-4o' || selectedModel === 'gpt-4o-mini') {
      if (!openAiApiKey) {
        throw new Error('OpenAI API key not configured')
      }

      try {
        console.log('Using OpenAI API with model:', selectedModel)
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openAiApiKey}`,
          },
          body: JSON.stringify({
            model: selectedModel,
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
      } catch (error) {
        console.error('OpenAI API error:', error)
        throw error
      }
    }

    // Handle OpenRouter models
    if (selectedModel.startsWith('anthropic/') || selectedModel.startsWith('meta/') || selectedModel.startsWith('google/')) {
      if (!openRouterApiKey) {
        throw new Error('OpenRouter API key not configured')
      }

      try {
        console.log('Using OpenRouter API with model:', selectedModel)
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openRouterApiKey}`,
            'HTTP-Referer': 'https://your-site.com',
          },
          body: JSON.stringify({
            model: selectedModel,
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
      } catch (error) {
        console.error('OpenRouter API error:', error)
        throw error
      }
    }

    throw new Error(`Invalid model selected: ${selectedModel}`)

  } catch (error) {
    console.error('Error in chat function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})