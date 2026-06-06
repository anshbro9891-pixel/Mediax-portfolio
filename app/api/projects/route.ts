import { auth } from "@/lib/auth";
import { getProjects, writeJsonFile, type Project } from "@/lib/data";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await getProjects());
}

export async function POST(request: Request) {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json()) as Omit<Project, "id">;
  const projects = await getProjects();
  const next = [...projects, { ...payload, id: randomUUID() }];
  await writeJsonFile("projects.json", next);
  return NextResponse.json(next);
}

export async function PUT(request: Request) {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json()) as Project;
  const projects = await getProjects();
  const next = projects.map((item) => (item.id === payload.id ? payload : item));
  await writeJsonFile("projects.json", next);
  return NextResponse.json(next);
}

export async function DELETE(request: Request) {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const projects = await getProjects();
  const next = projects.filter((item) => item.id !== id);
  await writeJsonFile("projects.json", next);
  return NextResponse.json(next);
}
