import { auth } from "@/lib/auth";
import { getSettings, writeJsonFile, type Settings } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await getSettings());
}

export async function PUT(request: Request) {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json()) as Settings;
  await writeJsonFile("settings.json", payload);
  return NextResponse.json(payload);
}
