import { promises as fs } from "fs";
import path from "path";
import { SERVICES_DATA, STATS_DATA, VALUES_DATA, TEAM_DATA, PROJECTS_DATA } from "./data";
import type { ServiceItem, ProjectItem, TeamMember, CompanyValue, CompanyStat } from "./types";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface CompanyProfile {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  serviceArea: string;
  vision: string;
  mission: string;
  establishedYear: string;
}

export interface StoreData {
  services: ServiceItem[];
  projects: ProjectItem[];
  team: TeamMember[];
  values: CompanyValue[];
  stats: CompanyStat[];
  messages: ContactMessage[];
  profile: CompanyProfile;
}

const STORE_PATH = path.join(process.cwd(), "data", "cms-store.json");

const DEFAULT_PROFILE: CompanyProfile = {
  name: "Bangun Ciptadana",
  tagline: "Your Real Partner",
  description:
    "Perusahaan jasa konstruksi nasional bergerak di bidang pembangunan sipil, renovasi, interior, aluminium, kaca, dan berbagai pekerjaan bangunan.",
  address: "Jl. XXXXXXXX No. XX, Kota XXXXX",
  phone: "+62 21-XXXX-XXXX",
  email: "info@bangun-ciptadana.id",
  serviceArea: "Melayani proyek konstruksi dan renovasi di seluruh Indonesia.",
  vision: "Menjadi perusahaan konstruksi terpercaya dengan standar mutu premium di Indonesia.",
  mission:
    "Menghadirkan karya konstruksi berkualitas tinggi, transparan, tepat waktu, dan berkelanjutan untuk setiap klien.",
  establishedYear: "2014",
};

const defaultStore = (): StoreData => ({
  services: [...SERVICES_DATA],
  projects: [...PROJECTS_DATA],
  team: [...TEAM_DATA],
  values: [...VALUES_DATA],
  stats: [...STATS_DATA],
  messages: [],
  profile: { ...DEFAULT_PROFILE },
});

let cache: StoreData | null = null;

// Vercel serverless filesystem is read-only at runtime.
// Use in-memory default store there so reads still work and writes are no-ops.
const isServerlessReadOnly = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

async function ensureFile(): Promise<void> {
  if (isServerlessReadOnly) return;
  try {
    await fs.access(STORE_PATH);
  } catch {
    const dir = path.dirname(STORE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify(defaultStore(), null, 2), "utf-8");
  }
}

export async function readStore(): Promise<StoreData> {
  if (cache) return cache;
  await ensureFile();
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<StoreData>;
    const base = defaultStore();
    cache = {
      services: parsed.services ?? base.services,
      projects: parsed.projects ?? base.projects,
      team: parsed.team ?? base.team,
      values: parsed.values ?? base.values,
      stats: parsed.stats ?? base.stats,
      messages: parsed.messages ?? base.messages,
      profile: { ...base.profile, ...(parsed.profile ?? {}) },
    };
  } catch {
    cache = defaultStore();
  }
  return cache;
}

export async function writeStore(next: StoreData): Promise<void> {
  cache = next;
  if (isServerlessReadOnly) return;
  await ensureFile();
  await fs.writeFile(STORE_PATH, JSON.stringify(next, null, 2), "utf-8");
}

export async function mutateStore<T>(mutator: (s: StoreData) => Promise<{ next: StoreData; result: T }> | { next: StoreData; result: T }): Promise<T> {
  const current = await readStore();
  const out = await mutator(current);
  await writeStore(out.next);
  return out.result;
}

export const defaultCompanyProfile = DEFAULT_PROFILE;
