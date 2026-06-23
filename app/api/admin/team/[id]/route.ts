import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mutateStore } from "@/data/store";
import type { TeamMember } from "@/data/types";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = (await req.json()) as Partial<TeamMember>;
  const result = await mutateStore((s) => {
    const idx = s.team.findIndex((x) => x.id === id);
    if (idx === -1) return { next: s, result: null };
    const cur = s.team[idx];
    const updated: TeamMember = {
      ...cur,
      name: body.name ?? cur.name,
      position: body.position ?? cur.position,
      imageUrl: body.imageUrl ?? cur.imageUrl,
    };
    const team = [...s.team];
    team[idx] = updated;
    return { next: { ...s, team }, result: updated };
  });
  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ member: result });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const result = await mutateStore((s) => {
    const exists = s.team.find((x) => x.id === id);
    if (!exists) return { next: s, result: false };
    return { next: { ...s, team: s.team.filter((x) => x.id !== id) }, result: true };
  });
  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
