// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hfhlmwhqvlvyzlzsjebd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmaGxtd2hxdmx2eXpsenNqZWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNTI3MjUsImV4cCI6MjA2MjkyODcyNX0.QZqKcGr3MTJNDykxW1SCdg5jdPDdlo2yB4-_4cDausw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);