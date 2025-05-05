import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
import * as schema from './schema';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

// Check for required environment variable
if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL is not defined in the environment variables');
}

// Create postgres connection
const queryClient = postgres(process.env.POSTGRES_URL);

// Create drizzle instance
export const db = drizzle(queryClient, { schema });
