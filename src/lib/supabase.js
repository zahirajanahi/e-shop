import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ivqepeinvwwycomqksvh.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2cWVwZWludnd3eWNvbXFrc3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMTI5NjIsImV4cCI6MjA1Mzg4ODk2Mn0.kAjUha2UXvw7otqq-Cx8Lpu3eJJnJsEOxI4CRrYu3C0";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
