/** Typographic wordmark: a small sun-over-horizon mark with the name set in the display face. */
export default function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <circle cx="16" cy="15" r="7" fill="#F29A2E" />
        <path d="M3 22c4-3 8-3 13 0s9 3 13 0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M6 27c3-2 6-2 10 0s7 2 10 0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity=".55" />
      </svg>
      <span className="text-[1.35rem] font-bold leading-none tracking-[-0.04em]">
        ayaan<span className="font-light opacity-70"> tours</span>
      </span>
    </span>
  );
}
