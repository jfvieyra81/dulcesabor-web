import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_KEY } from "./config.js";

const configured = SUPABASE_URL !== "YOUR_PROJECT_URL_HERE" && SUPABASE_KEY !== "YOUR_ANON_KEY_HERE";

export const supabase = configured ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// Ensures the browser has an anonymous auth session, creating one on first visit.
// Needed so customer_orders RLS (owner_id = auth.uid()) can identify this visitor.
export async function ensureSession() {
  const { data } = await supabase.auth.getSession();
  if (data.session) return data.session;
  const { data: signInData, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  return signInData.session;
}
