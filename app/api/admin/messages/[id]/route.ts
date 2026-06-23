import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mutateStore } from "@/data/store";

export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const result = await mutateStore((s) => {
    const idx = s.messages.findIndex((m) => m.id === id);
    if (idx === -1) return { next: s, result: null };
    const messages = [...s.messages];
    messages[idx] = { ...messages[idx], read: true };
    return { next: { ...s, messages }, result: messages[idx] };
  });
  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message: result });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const result = await mutateStore((s) => {
    const exists = s.messages.find((m) => m.id === id);
    if (!exists) return { next: s, result: false };
    return { next: { ...s, messages: s.messages.filter((m) => m.id !== id) }, result: true };
  });
  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
