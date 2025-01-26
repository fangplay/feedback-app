import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// Initialize and configure SQLite database
const initializeDatabase = async (): Promise<Database> => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

  // Create a `feedback` table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
};

export default initializeDatabase;
