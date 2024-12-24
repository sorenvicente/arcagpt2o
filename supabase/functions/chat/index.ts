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
    const { messages } = await req.json()

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

    console.log('Available APIs:', {
      openai: !!openAiApiKey,
      openRouter: !!openRouterApiKey,
    })

    let lastError = null

    // Try OpenAI first if available
    if (openAiApiKey) {
      try {
        console.log('Attempting to use OpenAI API')
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openAiApiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: messages,
            max_tokens: 1024,
          }),
        })

        const data = await response.json()
        
        if (!response.ok) {
          console.error('OpenAI API error:', data.error)
          lastError = data.error?.message || 'Error calling OpenAI API'
          // If quota exceeded or other error, try OpenRouter
          if (openRouterApiKey) {
            throw new Error('Fallback to OpenRouter')
          }
          throw new Error(lastError)
        }

        return new Response(
          JSON.stringify({ content: data.choices[0].message.content }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } catch (error) {
        // Only proceed to OpenRouter if it's available
        if (!openRouterApiKey || error.message !== 'Fallback to OpenRouter') {
          throw error
        }
      }
    }
    
    // Try OpenRouter if available
    if (openRouterApiKey) {
      try {
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
          lastError = data.error?.message || 'Error calling OpenRouter API'
          throw new Error(lastError)
        }

        return new Response(
          JSON.stringify({ content: data.choices[0].message.content }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } catch (error) {
        lastError = error.message
        throw error
      }
    }

    // If no API keys are configured or both services failed, throw a descriptive error
    const errorMessage = lastError 
      ? `All available AI services failed. Last error: ${lastError}. Please check your API keys and credits.`
      : 'No API keys configured. Please configure at least one API key (OpenAI or OpenRouter) in the settings.'
    
    throw new Error(errorMessage)

  } catch (error) {
    console.error('Error in chat function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})