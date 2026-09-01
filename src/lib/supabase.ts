import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hwnfeldryhflafpukklr.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/**
 * Public Supabase client using Anon Key.
 * Suitable for client-side and public queries.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Administrative Supabase client using Service Role Key.
 * MUST only be used server-side (e.g. API routes, vector upserting).
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey || supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
