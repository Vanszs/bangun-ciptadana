import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mutateStore, readStore } from "@/data/store";
import type { ProjectItem } from "@/data/types";

function makeId() {
  return "p" + Math.random().toString(36).slice(2, 9);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const store = await readStore();
  return NextResponse.json({ projects: store.projects });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json()) as Partial<ProjectItem>;
  if (!body.title || !body.description) {
    return NextResponse.json({ error: "Title dan description wajib diisi" }, { status: 400 });
  }
  const item: ProjectItem = {
    id: makeId(),
    title: body.title,
    description: body.description,
    category: body.category || "Konstruksi",
    imageUrl: body.imageUrl || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  };
  const result = await mutateStore((s) => ({
    next: { ...s, projects: [...s.projects, item] },
    result: item,
  }));
  return NextResponse.json({ project: result });
}
