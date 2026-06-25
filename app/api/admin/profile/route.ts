import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mutateStore, readStore } from "@/data/store";
import type { CompanyProfile } from "@/data/store";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const store = await readStore();
  return NextResponse.json({ profile: store.profile });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json()) as Partial<CompanyProfile>;
  const [result, store] = await Promise.all([
    mutateStore((s) => ({
      next: { ...s, profile: { ...s.profile, ...body } },
      result: null as unknown as CompanyProfile,
    })),
    readStore(),
  ]);
  return NextResponse.json({ profile: result || store.profile });
}
