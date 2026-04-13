import { NextResponse } from "next/server";

export async function GET(req) {
  const timer = new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 200);
  });
  await timer;
  return NextResponse.json({ message: "nothing" }, { status: 200 });
}
