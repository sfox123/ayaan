/** A small transit-map style strip of the towns on a route. */
export default function RouteLine({ stops, tone = "dark", className = "" }) {
  const dot = tone === "light" ? "border-white bg-canopy" : "border-canopy bg-mist";
  const line = tone === "light" ? "bg-white/40" : "bg-canopy/25";
  const text = tone === "light" ? "text-white/85" : "text-ink-600";
  return (
    <ol className={`flex flex-wrap items-center gap-y-2 ${className}`} aria-label={`Route: ${stops.join(", ")}`}>
      {stops.map((s, i) => (
        <li key={s} className="flex items-center">
          <span className={`h-2.5 w-2.5 shrink-0 rounded-full border-2 ${i === 0 || i === stops.length - 1 ? "border-coconut bg-coconut" : dot}`} />
          <span className={`ml-1.5 text-[0.9rem] font-medium ${text}`}>{s}</span>
          {i < stops.length - 1 && <span className={`mx-2 h-[2px] w-5 rounded ${line}`} aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}
