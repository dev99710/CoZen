// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sbvsmccwcphhbctbyylk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNidnNtY2N3Y3BoaGJjdGJ5eWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0MzU0NTYsImV4cCI6MjA1MjAxMTQ1Nn0.x5HeJ8Kv2vCnlmuYYDVdeApcKSXKs_fzx25Fmy2CbaQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);