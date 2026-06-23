import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mutateStore } from "@/data/store";
import type { CompanyValue } from "@/data/types";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = (await req.json()) as Partial<CompanyValue>;
  const result = await mutateStore((s) => {
    const idx = s.values.findIndex((x) => x.id === id);
    if (idx === -1) return { next: s, result: null };
    const cur = s.values[idx];
    const updated: CompanyValue = {
      ...cur,
      title: body.title ?? cur.title,
      description: body.description ?? cur.description,
    };
    const values = [...s.values];
    values[idx] = updated;
    return { next: { ...s, values }, result: updated };
  });
  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ value: result });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const result = await mutateStore((s) => {
    const exists = s.values.find((x) => x.id === id);
    if (!exists) return { next: s, result: false };
    return { next: { ...s, values: s.values.filter((x) => x.id !== id) }, result: true };
  });
  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
