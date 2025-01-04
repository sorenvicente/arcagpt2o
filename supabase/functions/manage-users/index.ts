import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { action, email, password, role, userId } = await req.json()

    // Check if the requesting user is an admin
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)
    if (authError) throw new Error('Authentication failed')

    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user?.id)
      .single()

    if (profile?.role !== 'admin') {
      throw new Error('Unauthorized: Only admins can manage users')
    }

    let result

    switch (action) {
      case 'create':
        const { data: newUser, error: createError } = await supabaseClient.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        })
        if (createError) throw createError

        // Create profile with role 'user'
        const { error: profileError } = await supabaseClient
          .from('profiles')
          .insert([
            {
              id: newUser.user.id,
              email,
              role: role || 'user', // Default to 'user' if no role is specified
            },
          ])
        if (profileError) throw profileError

        result = newUser
        break

      case 'delete':
        const { error: deleteError } = await supabaseClient.auth.admin.deleteUser(userId)
        if (deleteError) throw deleteError
        result = { message: 'User deleted successfully' }
        break

      default:
        throw new Error('Invalid action')
    }

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})