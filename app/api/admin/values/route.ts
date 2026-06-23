import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mutateStore, readStore } from "@/data/store";
import type { CompanyValue } from "@/data/types";

function makeId() { return "v" + Math.random().toString(36).slice(2, 9); }

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const store = await readStore();
  return NextResponse.json({ values: store.values });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json()) as Partial<CompanyValue>;
  if (!body.title || !body.description) {
    return NextResponse.json({ error: "Title dan description wajib diisi" }, { status: 400 });
  }
  const item: CompanyValue = { id: makeId(), title: body.title, description: body.description };
  const result = await mutateStore((s) => ({ next: { ...s, values: [...s.values, item] }, result: item }));
  return NextResponse.json({ value: result });
}
