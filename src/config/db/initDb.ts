import { db } from './dbConfig.js';
import fs from 'node:fs';
import path from 'node:path';

const migrationFilePath = path.join(import.meta.dirname, 'migration-db.sql');
const migrationFile = fs.readFileSync(migrationFilePath, 'utf8');

export async function initDB() {
   await db.query(migrationFile); 
}

initDB();
