import { createClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl: string = process.env.SUPABASE_URL!
const supabaseKey: string = process.env.SUPABASE_KEY!

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)
