import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mutateStore } from "@/data/store";
import type { ServiceItem } from "@/data/types";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = (await req.json()) as Partial<ServiceItem>;
  const result = await mutateStore((s) => {
    const idx = s.services.findIndex((x) => x.id === id);
    if (idx === -1) return { next: s, result: null };
    const updated: ServiceItem = {
      ...s.services[idx],
      title: body.title ?? s.services[idx].title,
      description: body.description ?? s.services[idx].description,
      iconName: body.iconName ?? s.services[idx].iconName,
    };
    const services = [...s.services];
    services[idx] = updated;
    return { next: { ...s, services }, result: updated };
  });
  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ service: result });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const result = await mutateStore((s) => {
    const exists = s.services.find((x) => x.id === id);
    if (!exists) return { next: s, result: false };
    return { next: { ...s, services: s.services.filter((x) => x.id !== id) }, result: true };
  });
  if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
