import { createClient } from "@supabase/supabase-js";

let SUPABASE_URL = '';
let SUPABASE_ANON_KEY = '';
// let SUPABASE_SERVICE_KEY = '';

if (import.meta.env.SSR) { // checks if running on server
  
  SUPABASE_URL = 'https://qvqhupgbhgtpldqkyjms.supabase.co';
  SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2cWh1cGdiaGd0cGxkcWt5am1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcwMTg4MzUsImV4cCI6MjAwMjU5NDgzNX0.jn5TiaWeIDBTRzvuWQ_9Pf3ltn4rEeAca8QcU-VA1cU';
  // SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2cWh1cGdiaGd0cGxkcWt5am1zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzAxODgzNSwiZXhwIjoyMDAyNTk0ODM1fQ.lBoRyce8c6StlT651Q4DSKmrPQnbz0rL-XzjQeSW1O0';

} else {
  // here you can hardcode your keys or fetch them from elsewhere
  // when the code runs in the browser
  SUPABASE_URL = 'https://qvqhupgbhgtpldqkyjms.supabase.co';
  SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2cWh1cGdiaGd0cGxkcWt5am1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcwMTg4MzUsImV4cCI6MjAwMjU5NDgzNX0.jn5TiaWeIDBTRzvuWQ_9Pf3ltn4rEeAca8QcU-VA1cU';
  // SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2cWh1cGdiaGd0cGxkcWt5am1zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzAxODgzNSwiZXhwIjoyMDAyNTk0ODM1fQ.lBoRyce8c6StlT651Q4DSKmrPQnbz0rL-XzjQeSW1O0';
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// console.log(supabase);
// console.log(supabase.auth);
// console.log(supabase.auth.session);
// console.log(supabase.auth.signIn);


export default supabase;
