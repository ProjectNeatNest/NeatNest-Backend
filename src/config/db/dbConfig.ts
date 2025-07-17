import { Pool } from 'pg'; 
import 'dotenv/config';

const { 
   SUPABASE_HOST, 
   SUPABASE_PORT, 
   SUPABASE_USER,
   SUPABASE_PASSWORD, 
   SUPABASE_DATABASE,
} = process.env;

export const db = new Pool({
   connectionString: process.env.SUPABASE_CONNECTION_STRING,
}); 

export async function sendQuery(sql: string, arrayofArguments?: any[]) {
   const results = await db.query(sql, arrayofArguments); 
   return results.rows;
}