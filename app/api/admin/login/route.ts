import { NextResponse } from "next/server";

const adminCredentials = {
  username: "admin",
  password: "DEVbeta@123",
};

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === adminCredentials.username && password === adminCredentials.password) {
    const token = "secure-admin-token"; // Replace with a real JWT in production
    return NextResponse.json({ token });
  }

  return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
}
