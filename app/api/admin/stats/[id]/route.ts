import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mutateStore } from "@/data/store";
import type { CompanyStat } from "@/data/types";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = (await req.json()) as Partial<CompanyStat>;
  const result = await mutateStore((s) => {
    const idx = s.stats.findIndex((x) => x.id === id);
    if (idx === -1) return { next: s, result: null };
    const cur = s.stats[idx];
    const updated: CompanyStat = {
      ...cur,
      value: body.value ?? cur.value,
      label: body.label ?? cur.label,
      iconName: body.iconName ?? cur.iconName,
    };
    const stats = [...s.stats];
    stats[idx] = updated;
    return { next: { ...s, stats }, result: updated };
  });
  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ stat: result });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const result = await mutateStore((s) => {
    const exists = s.stats.find((x) => x.id === id);
    if (!exists) return { next: s, result: false };
    return { next: { ...s, stats: s.stats.filter((x) => x.id !== id) }, result: true };
  });
  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
