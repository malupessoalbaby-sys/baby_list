import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://bcnwgcwhwqlveytaalik.supabase.co'
const supabaseKey = 'sb_publishable_lSafo5XuMVB7p5qMf7wY-g_c_zp9A-z'

export const supabase = createClient(supabaseUrl, supabaseKey)