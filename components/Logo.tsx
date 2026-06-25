import React from "react";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark" | "footer";
  showText?: boolean;
}

export default function Logo({ className = "", variant = "light", showText = true }: LogoProps) {
  const isFooter = variant === "footer";
  const isDark = variant === "dark";
  const textColor = isFooter || isDark ? "text-white" : "text-brand-primary-dark";
  const subtextColor = isFooter || isDark ? "text-white/80" : "text-brand-secondary-dark";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <svg className="h-10 w-10 shrink-0" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M210 130L30 240H90V380H220V240L210 130Z" fill="var(--color-brand-primary)" />
        <path d="M90 240L210 130L215 260H220V380H90V240Z" fill="var(--color-brand-primary-dark)" opacity="0.15" />
        <path d="M200 120H180V380H220V240L200 120Z" fill="var(--color-brand-primary)" />
        <path d="M30 230L210 120L220 130L40 240H30Z" fill="var(--color-brand-primary)" />
        <path d="M230 140C250 110 270 70 340 50C310 90 270 180 260 380H230C235 280 232 195 230 140Z" fill="var(--color-brand-secondary-dark)" />
        <path d="M272 140C295 110 320 70 395 50C360 90 315 180 305 380H275C282 280 276 195 272 140Z" fill="var(--color-brand-secondary)" />
        <path d="M315 140C340 110 375 70 455 50C415 90 365 180 355 380H322C330 280 322 195 315 140Z" fill="var(--color-brand-secondary)" opacity="0.85" />
        <rect x="25" y="405" width="450" height="45" rx="6" fill="var(--color-brand-primary)" />
        <text x="250" y="438" fill="#FFFFFF" fontSize="30" fontWeight="bold" fontFamily="system-ui, sans-serif" letterSpacing="4" textAnchor="middle">BANGUN CIPTADANA</text>
      </svg>
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-extrabold tracking-wider text-lg ${textColor}`}>BANGUN</span>
          <span className={`font-semibold tracking-widest text-xs ${subtextColor}`}>CIPTADANA</span>
        </div>
      )}
    </div>
  );
}
