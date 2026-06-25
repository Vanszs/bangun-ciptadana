import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 py-12 text-[#1E293B] font-sans selection:bg-[#1491D0]/20 selection:text-[#1491D0] relative z-20">
      <div className="max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Side: Massive Typography and Swiss Graphic (6 cols) */}
        <div className="md:col-span-6 flex flex-col justify-between h-full min-h-[360px] border-l-4 border-[#1491D0] pl-6 md:pl-8">
          <div>
            <div className="text-[14px] font-bold tracking-[0.2em] text-[#1491D0] uppercase mb-4">
              Error / Status
            </div>
            <h1 className="text-[120px] md:text-[160px] font-black tracking-tighter leading-none select-none text-[#1E293B]">
              404
            </h1>
          </div>
          
          {/* Striking Swiss Design Geometric SVG on Brand Palette */}
          <div className="w-full max-w-[280px] mt-6">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <rect x="0" y="0" width="30" height="30" fill="#1E293B" />
              <rect x="35" y="0" width="30" height="30" fill="#1E293B" />
              <rect x="70" y="0" width="30" height="30" fill="#1491D0" />
              
              <rect x="0" y="35" width="30" height="30" fill="#1E293B" />
              <rect x="37" y="37" width="26" height="26" stroke="#1491D0" strokeWidth="2" strokeDasharray="4 2" />
              <rect x="70" y="35" width="30" height="30" fill="#1E293B" />
              
              <rect x="0" y="70" width="30" height="30" fill="#7BC255" />
              <rect x="35" y="70" width="30" height="30" fill="#1E293B" />
              <rect x="70" y="70" width="30" height="30" fill="#1E293B" />
            </svg>
          </div>
        </div>

        {/* Right Side: Informational content & Action (6 cols) */}
        <div className="md:col-span-6 flex flex-col justify-center h-full min-h-[300px]">
          <div className="border-t-2 border-[#1E293B] pt-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1E293B] uppercase mb-4 leading-none">
              Halaman Tidak Ditemukan.
            </h2>
            <p className="text-sm md:text-base text-[#64748B] leading-relaxed mb-8 max-w-[400px]">
              Tautan yang Anda tuju mungkin rusak, telah dihapus, atau tidak pernah ada dalam sistem grid kami.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-6 py-3.5 bg-[#1491D0] hover:bg-[#0D6EA5] text-white text-xs font-bold tracking-wider uppercase transition-all duration-250 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1491D0]"
            >
              Kembali ke Beranda
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3.5 border border-[#1E293B] hover:border-[#1491D0] hover:text-[#1491D0] text-xs font-bold tracking-wider uppercase transition-all duration-250"
            >
              Hubungi Dukungan
            </Link>
          </div>

          {/* Tiny swiss styling detail at bottom */}
          <div className="mt-12 text-[10px] tracking-widest text-[#64748B] uppercase flex items-center gap-2">
            <span>Grid System</span>
            <span className="w-1.5 h-1.5 bg-[#7BC255] rounded-full inline-block" />
            <span>Bangun Ciptadana</span>
          </div>
        </div>
      </div>
    </div>
  );
}
