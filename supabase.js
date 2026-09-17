// Supabase public client configuration.
// This publishable/anon key is intended for browser use; never put a service-role key here.
const SUPABASE_URL = "https://ryijhmvhllurydpdnbhs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_J4VU-KPurCoHfyxTkJBzEA_jAj0xJLd";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

// Load the expanded Classic question bank before the following scripts run.
document.write('<script src="question_expansion.js"><\\/script>');
document.write('<script src="question_expansion_2.js"><\\/script>');
document.write('<script src="question_expansion_3.js"><\\/script>');
document.write('<script src="question_expansion_4.js"><\\/script>');
