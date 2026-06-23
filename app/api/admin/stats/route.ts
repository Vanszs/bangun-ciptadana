import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mutateStore, readStore } from "@/data/store";
import type { CompanyStat } from "@/data/types";

function makeId() {
  return "st" + Math.random().toString(36).slice(2, 9);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const store = await readStore();
  return NextResponse.json({ stats: store.stats });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json()) as Partial<CompanyStat>;
  if (!body.value || !body.label) {
    return NextResponse.json({ error: "Value dan label wajib diisi" }, { status: 400 });
  }
  const item: CompanyStat = {
    id: makeId(),
    value: body.value,
    label: body.label,
    iconName: body.iconName || "Calendar",
  };
  const result = await mutateStore((s) => ({ next: { ...s, stats: [...s.stats, item] }, result: item }));
  return NextResponse.json({ stat: result });
}
