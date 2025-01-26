import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const getDbConnection = async () => {
  return open({
    filename: '../../lib/database.sqlite', // Path to SQLite database file
    driver: sqlite3.Database,
  });
};

export async function GET() {
  try {
    const db = await getDbConnection();
    const feedbacks = await db.all("SELECT id, message FROM feedbacks");

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json({ error: "Failed to fetch feedbacks" }, { status: 500 });
  }
}
