import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL?.trim() || 'postgres://postgres:postgres@localhost:5432/postgres';

// for query purposes
const queryClient = postgres(DATABASE_URL, { prepare: false, ssl: 'allow' });
const db = drizzle(queryClient);

export { db };
