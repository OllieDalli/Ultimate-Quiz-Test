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

// Load the WTA recovery patch after app.js has executed. app.js registers
// its DOMContentLoaded handler after this file, so a zero-delay injection
// guarantees the patch sees the completed WTA functions without blocking
// the normal quiz startup.
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const script = document.createElement("script");
        script.src = "wta-fix.js?v=2";
        script.async = false;
        document.head.appendChild(script);
    }, 0);

    // Classic difficulty selection fix. This is loaded after app.js so it
    // can safely replace the original difficulty handler. The version query
    // also prevents GitHub Pages/browser caching from serving the old patch.
    setTimeout(() => {
        const script = document.createElement("script");
        script.src = "classic-difficulty-fix.js?v=2";
        script.async = false;
        document.head.appendChild(script);
    }, 0);
});
