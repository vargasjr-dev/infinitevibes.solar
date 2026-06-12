import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Roadmap — Infinite Vibes",
  description:
    "Three major phases from orbital ring to Dyson sphere to infinite clean energy on Earth.",
};

function PhaseCard({
  step,
  title,
  subtitle,
  description,
  href,
  status,
}: {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  href?: string;
  status: "active" | "locked";
}) {
  const isActive = status === "active";

  const inner = (
    <div
      className={`group bg-surface border rounded-xl p-8 transition-all ${
        isActive
          ? "border-border hover:border-solar/40 cursor-pointer"
          : "border-border/40 opacity-50"
      }`}
    >
      <div className="flex items-start gap-5">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-full border flex items-center justify-center font-mono font-bold text-sm ${
            isActive
              ? "bg-solar/10 border-solar/30 text-solar"
              : "bg-muted/10 border-muted/20 text-muted"
          }`}
        >
          {step}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h2
              className={`text-xl font-bold ${isActive ? "group-hover:text-solar transition-colors" : ""}`}
            >
              {title}
            </h2>
            {!isActive && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted/10 text-muted border border-muted/20">
                locked
              </span>
            )}
          </div>
          <div className="text-xs font-mono text-muted mb-3">{subtitle}</div>
          <p className="text-muted text-sm leading-relaxed">{description}</p>
        </div>

        {isActive && (
          <div className="flex-shrink-0 text-muted group-hover:text-solar transition-colors mt-1">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  if (href && isActive) {
    return <Link href={href}>{inner}</Link>;
  }
  return inner;
}

export default function RoadmapPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Roadmap</h1>
            <p className="text-muted text-lg">
              Three phases. Each one unlocks the next.
            </p>
          </div>

          <div className="grid gap-4">
            <PhaseCard
              step={1}
              title="Orbital Ring"
              subtitle="Around Earth at 100 km altitude"
              description="A cable spinning at orbital velocity, supporting stationary platforms via excess centrifugal force. Reduces launch costs from $2,700/kg to $1.40/kg. Bootstraps from a $2M seed through self-reinforcing material transport."
              href="/roadmap/orbital-ring"
              status="active"
            />
            <PhaseCard
              step={2}
              title="Dyson Sphere"
              subtitle="Around the Sun"
              description="Solar power satellites manufactured from lunar material and launched for free via the orbital ring. Scale until we capture a meaningful fraction of the Sun's total output."
              status="locked"
            />
            <PhaseCard
              step={3}
              title="Relay to Earth"
              subtitle="Wireless power transmission"
              description="Beam energy from orbit to receiving stations on the surface. Clean, continuous power anywhere on Earth — 24/7, no weather, no night."
              status="locked"
            />
          </div>
        </div>
      </main>
    </>
  );
}
