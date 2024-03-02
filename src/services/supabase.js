import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://szkngpgdpdukeoawmrwg.supabase.co";
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
