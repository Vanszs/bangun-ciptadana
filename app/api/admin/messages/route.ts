import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mutateStore, readStore } from "@/data/store";
import type { ContactMessage } from "@/data/store";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const store = await readStore();
  return NextResponse.json({ messages: store.messages });
}

export async function POST(req: Request) {
  // Public submission from contact form
  const body = (await req.json()) as Partial<ContactMessage>;
  if (!body.name || !body.email || !body.subject || !body.message) {
    return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
  }
  const item: ContactMessage = {
    id: "m" + Math.random().toString(36).slice(2, 9),
    name: body.name,
    email: body.email,
    phone: body.phone,
    subject: body.subject,
    message: body.message,
    createdAt: new Date().toISOString(),
    read: false,
  };
  const result = await mutateStore((s) => ({
    next: { ...s, messages: [item, ...s.messages] },
    result: item,
  }));
  return NextResponse.json({ message: result });
}
