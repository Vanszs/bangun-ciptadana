import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mutateStore, readStore } from "@/data/store";
import type { ServiceItem } from "@/data/types";

function makeId() {
  return "s" + Math.random().toString(36).slice(2, 9);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const store = await readStore();
  return NextResponse.json({ services: store.services });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json()) as Partial<ServiceItem>;
  if (!body.title || !body.description) {
    return NextResponse.json({ error: "Title dan description wajib diisi" }, { status: 400 });
  }
  const item: ServiceItem = {
    id: makeId(),
    title: body.title,
    description: body.description,
    iconName: body.iconName || "Briefcase",
  };
  const result = await mutateStore((s) => ({
    next: { ...s, services: [...s.services, item] },
    result: item,
  }));
  return NextResponse.json({ service: result });
}
