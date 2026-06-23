import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mutateStore } from "@/data/store";
import type { ProjectItem } from "@/data/types";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = (await req.json()) as Partial<ProjectItem>;
  const result = await mutateStore((s) => {
    const idx = s.projects.findIndex((x) => x.id === id);
    if (idx === -1) return { next: s, result: null };
    const cur = s.projects[idx];
    const updated: ProjectItem = {
      ...cur,
      title: body.title ?? cur.title,
      description: body.description ?? cur.description,
      category: body.category ?? cur.category,
      imageUrl: body.imageUrl ?? cur.imageUrl,
    };
    const projects = [...s.projects];
    projects[idx] = updated;
    return { next: { ...s, projects }, result: updated };
  });
  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ project: result });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const result = await mutateStore((s) => {
    const exists = s.projects.find((x) => x.id === id);
    if (!exists) return { next: s, result: false };
    return { next: { ...s, projects: s.projects.filter((x) => x.id !== id) }, result: true };
  });
  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
