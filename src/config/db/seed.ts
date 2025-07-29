import { sendQuery } from './dbConfig.js';
import fs from 'node:fs';
import path from 'node:path';

const seedFilePath = path.join(import.meta.dirname, 'seed-db.sql');
const seedFile = fs.readFileSync(seedFilePath, 'utf8');

export async function seedDB() {
    await sendQuery(seedFile);
}

seedDB();
