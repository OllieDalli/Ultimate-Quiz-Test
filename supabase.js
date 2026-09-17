// Supabase public client configuration.
// This publishable/anon key is intended for browser use; never put a service-role key here.
const SUPABASE_URL = "https://ryijhmvhllurydpdnbhs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_J4VU-KPurCoHfyxTkJBzEA_jAj0xJLd";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

// Load the expanded song library before the quiz startup runs.
document.write('<script src="song_expansion.js"><\\/script>');
