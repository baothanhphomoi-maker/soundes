import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    // Get all listen counts from database
    const { data: episodes, error } = await supabase
      .from('radio_episodes')
      .select('id, listen_count');

    if (error) {
      console.error('Error fetching radio episodes:', error);
    }

    // Build a map of episode_id -> listen_count
    const episodeMap: Record<string, number> = {};
    episodes?.forEach(ep => {
      episodeMap[ep.id] = ep.listen_count || 0;
    });

    // Return the episodes with real listen counts (default 0 for new episodes)
    const result = episodes?.map(ep => ({
      id: ep.id,
      listen_count: ep.listen_count || 0
    })) || [];

    return new Response(JSON.stringify(episodeMap), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
