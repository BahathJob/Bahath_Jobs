import { createClient } from '@libsql/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create database directory if it doesn't exist
const dbDir = path.join(__dirname, '../data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'bahath_jobz.db');

// Create database client
const db = createClient({
  url: `file:${dbPath}`
});

// Initialize database with schema
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

// Split schema into individual statements and execute them
const statements = schema.split(';').filter(stmt => stmt.trim());
for (const statement of statements) {
  if (statement.trim()) {
    try {
      await db.execute(statement);
    } catch (error) {
      // Ignore table already exists errors
      if (!error.message.includes('already exists')) {
        console.error('Error executing statement:', statement);
        console.error(error);
      }
    }
  }
}

export default db;