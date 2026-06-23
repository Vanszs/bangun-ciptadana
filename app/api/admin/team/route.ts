import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mutateStore, readStore } from "@/data/store";
import type { TeamMember } from "@/data/types";

function makeId() { return "t" + Math.random().toString(36).slice(2, 9); }

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const store = await readStore();
  return NextResponse.json({ team: store.team });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json()) as Partial<TeamMember>;
  if (!body.name || !body.position) {
    return NextResponse.json({ error: "Name dan position wajib diisi" }, { status: 400 });
  }
  const item: TeamMember = {
    id: makeId(),
    name: body.name,
    position: body.position,
    imageUrl: body.imageUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80",
  };
  const result = await mutateStore((s) => ({ next: { ...s, team: [...s.team, item] }, result: item }));
  return NextResponse.json({ member: result });
}
