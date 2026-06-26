import { ServiceItem, ProjectItem, TeamMember, CompanyValue, CompanyStat } from "./types";

export const SERVICES_DATA: ServiceItem[] = [
  { id: "s1", title: "Konstruksi Bangunan", description: "Perencanaan dan pelaksanaan pembangunan berbagai jenis bangunan dari pondasi hingga finishing.", iconName: "Building2" },
  { id: "s2", title: "Atap dan Kanopi", description: "Pemasangan atap, kanopi, baja ringan, dan berbagai struktur pelindung bangunan bergaransi.", iconName: "Home" },
  { id: "s3", title: "Partisi", description: "Pemasangan sekat partisi gipsum, kaca, dan akustik untuk ruang kantor, ruko, maupun hunian.", iconName: "LayoutGrid" },
  { id: "s4", title: "Desain Arsitektur", description: "Jasa perencanaan arsitektur, gambar kerja 2D, visualisasi 3D, dan perhitungan RAB profesional.", iconName: "Compass" },
  { id: "s5", title: "Aluminium dan Kaca", description: "Fabrikasi dan pemasangan kusen, pintu, jendela aluminium, serta instalasi kaca tempered dan fasad kaca berkualitas premium berskala besar.", iconName: "Layers" },
  { id: "s6", title: "Renovasi dan Perluasan", description: "Solusi perbaikan struktur, renovasi fasad, serta pelebaran ruang bangunan lama Anda.", iconName: "Scaling" },
  { id: "s7", title: "Pengecatan", description: "Pekerjaan pengecatan dinding interior dan eksterior gedung dengan cat tahan cuaca ekstrem.", iconName: "Paintbrush" },
  { id: "s8", title: "Kelislistrikan", description: "Instalasi panel listrik, jaringan kabel terstruktur, saklar, lampu, dan sistem kelistrikan bangunan.", iconName: "Lightbulb" },
  { id: "s9", title: "Interior dan Eksterior", description: "Desain interior modern, kitchen set, backdrop, pengerjaan mebel custom, serta finishing eksterior bangunan berkualitas tinggi.", iconName: "Armchair" },
];

export const STATS_DATA: CompanyStat[] = [
  { id: "st1", value: "10+", label: "Tahun Pengalaman", iconName: "Calendar" },
  { id: "st2", value: "200+", label: "Proyek Selesai", iconName: "Briefcase" },
  { id: "st3", value: "100+", label: "Klien Puas", iconName: "Smile" },
  { id: "st4", value: "Profesional", label: "Tim Ahli", iconName: "UserCheck" },
];

export const VALUES_DATA: CompanyValue[] = [
  { id: "v1", title: "Kualitas", description: "Mengutamakan kualitas terbaik di setiap detail material maupun tahapan pengerjaan proyek." },
  { id: "v2", title: "Integritas", description: "Bekerja dengan penuh kejujuran, transparansi anggaran, serta tanggung jawab profesional." },
  { id: "v3", title: "Komitmen", description: "Berorientasi penuh pada ketepatan waktu pengerjaan dan kepuasan utama seluruh pelanggan kami." },
];

export const TEAM_DATA: TeamMember[] = [
  { id: "t1", name: "Ir. Hermawan Prasetyo", position: "Direktur Utama", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80" },
  { id: "t2", name: "Budi Santoso, S.T.", position: "Manajer Proyek", imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80" },
  { id: "t3", name: "Achmad Fauzi, S.T.", position: "Site Engineer", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80" },
  { id: "t4", name: "Dedi Kurniawan", position: "Site Supervisor", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80" },
  { id: "t5", name: "Hendra Wijaya, S.T.", position: "Estimator", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80" },
  { id: "t6", name: "Rian Hidayat, S.T.", position: "Quality Control", imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&h=400&q=80" },
  { id: "t7", name: "Agus Susanto", position: "Purchasing", imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80" },
  { id: "t8", name: "Dian Lestari, S.E.", position: "Administrasi", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80" },
];

export const PROJECTS_DATA: ProjectItem[] = [
  { id: "p1", title: "Fasad Aluminium & Kaca Gedung", category: "Aluminium & Kaca", description: "Instalasi fasad aluminium composite panel (ACP) dan kaca tempered pada gedung perkantoran modern.", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" },
  { id: "p2", title: "Renovasi Bangunan Kantor", category: "Renovasi", description: "Pekerjaan renovasi total gedung kantor 4 lantai dengan konsep modern industrial di kawasan perkotaan.", imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" },
  { id: "p3", title: "Desain Interior Kantor", category: "Interior", description: "Perencanaan interior, custom mebel, backdrop resepsionis, dan lighting modern di ruang kerja korporasi.", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" },
  { id: "p4", title: "Pemasangan Partisi Kaca", category: "Partisi", description: "Sekat partisi kaca aluminium kedap suara untuk integrasi ruang kerja yang tampak modern dan luas.", imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80" },
  { id: "p5", title: "Atap Baja Ringan", category: "Atap & Kanopi", description: "Konstruksi atap baja ringan dan pemasangan kanopi alderon modular untuk pergudangan modern.", imageUrl: "https://images.unsplash.com/photo-1635424710928-0544e8512eae?auto=format&fit=crop&w=800&q=80" },
  { id: "p6", title: "Kelistrikan Modern", category: "Kelistrikan", description: "Pemasangan panel distribusi utama, kabel power terstruktur, serta automation system dalam panel gedung.", imageUrl: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&w=800&q=80" },
  { id: "p7", title: "Pembangunan Ruko", category: "Konstruksi Bangunan", description: "Pengerjaan struktur beton bertulang, dinding bata ringan, plesteran, dan finishing kompleks ruko bertingkat.", imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80" },
  { id: "p8", title: "Pengecatan Eksterior", category: "Renovasi", description: "Aplikasi cat tahan cuaca weatherproof eksterior gedung bertingkat dengan tali pengaman scaffolding tinggi.", imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80" },
];
