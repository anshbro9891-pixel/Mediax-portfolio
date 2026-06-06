import { auth } from "@/lib/auth";
import { getTestimonials, writeJsonFile, type Testimonial } from "@/lib/data";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await getTestimonials());
}

export async function POST(request: Request) {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json()) as Omit<Testimonial, "id">;
  const testimonials = await getTestimonials();
  const next = [...testimonials, { ...payload, id: randomUUID() }];
  await writeJsonFile("testimonials.json", next);
  return NextResponse.json(next);
}

export async function PUT(request: Request) {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json()) as Testimonial;
  const testimonials = await getTestimonials();
  const next = testimonials.map((item) => (item.id === payload.id ? payload : item));
  await writeJsonFile("testimonials.json", next);
  return NextResponse.json(next);
}

export async function DELETE(request: Request) {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const testimonials = await getTestimonials();
  const next = testimonials.filter((item) => item.id !== id);
  await writeJsonFile("testimonials.json", next);
  return NextResponse.json(next);
}
