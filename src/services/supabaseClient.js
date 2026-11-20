import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jwmzslgukwqwnrvfdcmf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3bXpzbGd1a3dxd25ydmZkY21mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxNzk1MTksImV4cCI6MjExMDc1NTUxOX0.7eImf70PD_cVlsw2_kOEY1UObcDE7yesgp-PX08swN8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
