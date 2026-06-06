import { auth } from "@/lib/auth";
import { getServices, writeJsonFile, type Service } from "@/lib/data";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await getServices());
}

export async function POST(request: Request) {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json()) as Omit<Service, "id">;
  const services = await getServices();
  const next = [...services, { ...payload, id: randomUUID() }];
  await writeJsonFile("services.json", next);
  return NextResponse.json(next);
}

export async function PUT(request: Request) {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json()) as Service;
  const services = await getServices();
  const next = services.map((item) => (item.id === payload.id ? payload : item));
  await writeJsonFile("services.json", next);
  return NextResponse.json(next);
}

export async function DELETE(request: Request) {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const services = await getServices();
  const next = services.filter((item) => item.id !== id);
  await writeJsonFile("services.json", next);
  return NextResponse.json(next);
}
