import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

export async function authenticateUser(authHeader: string | null) {
  if (!authHeader) {
    throw new Error('Sem cabeçalho de autorização');
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
    authHeader.replace('Bearer ', '')
  );

  if (authError || !user) {
    console.error('Erro de autenticação:', authError);
    throw new Error('Autenticação inválida');
  }

  return { supabaseClient, user };
}

export async function getApiKeys(supabaseClient: any) {
  const { data: apiKeys, error: apiKeysError } = await supabaseClient
    .from('api_keys')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  if (apiKeysError) {
    console.error('Erro ao buscar chaves API:', apiKeysError);
    throw new Error('Falha ao buscar chaves API');
  }

  if (!apiKeys?.length) {
    throw new Error('Nenhuma chave API configurada');
  }

  const apiKey = apiKeys[0];
  
  if (!apiKey.openai_key && !apiKey.openrouter_key) {
    throw new Error('Por favor, configure pelo menos uma chave API (OpenAI ou OpenRouter) na página de Chaves API.');
  }

  return apiKey;
}