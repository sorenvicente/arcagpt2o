export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const defaultConfig = {
  max_tokens: 4000,
  defaultOpenRouterModel: 'anthropic/claude-2',
  defaultOpenAIModel: 'gpt-4'
};