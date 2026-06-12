import Link from "next/link";
import Nav from "@/components/Nav";
import SubscribeForm from "@/components/SubscribeForm";

function SolarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MissionDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 840 255"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-3xl mx-auto min-w-[560px]"
        aria-label="Three-step mission diagram: Orbital Ring, Dyson Sphere, Relay to Earth"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#2a2a2a" />
          </marker>
          <radialGradient id="earthGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
          <radialGradient id="sunGrad" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>
        </defs>

        {/* ── Stars ── */}
        <circle cx="38" cy="22" r="1" fill="white" opacity="0.45" />
        <circle cx="82" cy="52" r="1.2" fill="white" opacity="0.5" />
        <circle cx="168" cy="16" r="0.9" fill="white" opacity="0.4" />
        <circle cx="248" cy="38" r="1.1" fill="white" opacity="0.35" />
        <circle cx="305" cy="18" r="1" fill="white" opacity="0.5" />
        <circle cx="370" cy="44" r="0.8" fill="white" opacity="0.4" />
        <circle cx="455" cy="24" r="1.2" fill="white" opacity="0.45" />
        <circle cx="530" cy="50" r="1" fill="white" opacity="0.4" />
        <circle cx="598" cy="28" r="0.9" fill="white" opacity="0.5" />
        <circle cx="662" cy="46" r="1.1" fill="white" opacity="0.35" />
        <circle cx="748" cy="19" r="1" fill="white" opacity="0.45" />
        <circle cx="808" cy="42" r="1.2" fill="white" opacity="0.5" />
        <circle cx="105" cy="195" r="1" fill="white" opacity="0.3" />
        <circle cx="448" cy="205" r="0.9" fill="white" opacity="0.35" />
        <circle cx="722" cy="198" r="1.1" fill="white" opacity="0.3" />

        {/* ══════════════════════════════════════════
            PANEL 1 — ORBITAL RING  (cx=140, cy=108)
        ══════════════════════════════════════════ */}

        {/* Back half of ring (behind Earth) */}
        <path
          d="M 78,108 A 62,18 0 0,0 202,108"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          opacity="0.28"
          strokeDasharray="5 3"
        />

        {/* Earth */}
        <circle cx="140" cy="108" r="36" fill="url(#earthGrad)" />
        {/* Subtle continent-like highlight */}
        <ellipse
          cx="128"
          cy="100"
          rx="10"
          ry="7"
          fill="#60a5fa"
          opacity="0.25"
        />
        <ellipse cx="152" cy="118" rx="8" ry="5" fill="#60a5fa" opacity="0.2" />

        {/* Front half of ring (in front of Earth) */}
        <path
          d="M 78,108 A 62,18 0 0,1 202,108"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2.5"
          opacity="0.9"
        />

        {/* Step labels */}
        <text
          x="140"
          y="168"
          textAnchor="middle"
          fill="#f59e0b"
          fontSize="10"
          fontFamily="monospace"
          letterSpacing="1"
        >
          STEP 1
        </text>
        <text
          x="140"
          y="186"
          textAnchor="middle"
          fill="#ededed"
          fontSize="14"
          fontWeight="bold"
        >
          Orbital Ring
        </text>
        <text x="140" y="204" textAnchor="middle" fill="#737373" fontSize="11">
          around Earth
        </text>

        {/* ── Arrow 1 → 2 ── */}
        <line
          x1="215"
          y1="108"
          x2="264"
          y2="108"
          stroke="#2a2a2a"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />

        {/* ══════════════════════════════════════════
            PANEL 2 — DYSON SPHERE  (cx=420, cy=108)
        ══════════════════════════════════════════ */}

        {/* Outer glow */}
        <circle cx="420" cy="108" r="88" fill="#f59e0b" opacity="0.04" />
        <circle cx="420" cy="108" r="78" fill="#f59e0b" opacity="0.06" />

        {/* Dyson shell segments */}
        <circle
          cx="420"
          cy="108"
          r="74"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeDasharray="26 11"
          opacity="0.65"
        />

        {/* Sun body */}
        <circle cx="420" cy="108" r="44" fill="url(#sunGrad)" />

        {/* Sun surface texture */}
        <circle
          cx="420"
          cy="108"
          r="44"
          fill="none"
          stroke="#fde68a"
          strokeWidth="0.5"
          opacity="0.4"
        />

        {/* Step labels */}
        <text
          x="420"
          y="200"
          textAnchor="middle"
          fill="#f59e0b"
          fontSize="10"
          fontFamily="monospace"
          letterSpacing="1"
        >
          STEP 2
        </text>
        <text
          x="420"
          y="218"
          textAnchor="middle"
          fill="#ededed"
          fontSize="14"
          fontWeight="bold"
        >
          Dyson Sphere
        </text>
        <text x="420" y="236" textAnchor="middle" fill="#737373" fontSize="11">
          around the Sun
        </text>

        {/* ── Arrow 2 → 3 ── */}
        <line
          x1="505"
          y1="108"
          x2="554"
          y2="108"
          stroke="#2a2a2a"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />

        {/* ══════════════════════════════════════════
            PANEL 3 — RELAY TO EARTH  (cx=700, cy=140)
        ══════════════════════════════════════════ */}

        {/* Relay satellites (small diamonds in space) */}
        <rect
          x="629"
          y="44"
          width="7"
          height="7"
          transform="rotate(45 632.5 47.5)"
          fill="#f59e0b"
          opacity="0.7"
        />
        <rect
          x="762"
          y="44"
          width="7"
          height="7"
          transform="rotate(45 765.5 47.5)"
          fill="#f59e0b"
          opacity="0.7"
        />

        {/* Energy beams (glow layer) */}
        <line
          x1="633"
          y1="48"
          x2="688"
          y2="112"
          stroke="#f59e0b"
          strokeWidth="5"
          opacity="0.08"
        />
        <line
          x1="767"
          y1="48"
          x2="712"
          y2="112"
          stroke="#f59e0b"
          strokeWidth="5"
          opacity="0.08"
        />

        {/* Energy beams (main) */}
        <line
          x1="633"
          y1="48"
          x2="688"
          y2="112"
          stroke="#f59e0b"
          strokeWidth="1.5"
          opacity="0.75"
          strokeDasharray="6 3"
        />
        <line
          x1="767"
          y1="48"
          x2="712"
          y2="112"
          stroke="#f59e0b"
          strokeWidth="1.5"
          opacity="0.75"
          strokeDasharray="6 3"
        />

        {/* Earth */}
        <circle cx="700" cy="140" r="34" fill="url(#earthGrad)" />
        {/* Impact glow on Earth */}
        <circle cx="700" cy="115" r="8" fill="#f59e0b" opacity="0.18" />
        <ellipse
          cx="688"
          cy="132"
          rx="9"
          ry="6"
          fill="#60a5fa"
          opacity="0.25"
        />

        {/* Step labels */}
        <text
          x="700"
          y="192"
          textAnchor="middle"
          fill="#f59e0b"
          fontSize="10"
          fontFamily="monospace"
          letterSpacing="1"
        >
          STEP 3
        </text>
        <text
          x="700"
          y="210"
          textAnchor="middle"
          fill="#ededed"
          fontSize="14"
          fontWeight="bold"
        >
          Relay to Earth
        </text>
        <text x="700" y="228" textAnchor="middle" fill="#737373" fontSize="11">
          wireless power
        </text>
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        {/* ── Hero ── */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-solar/10 text-solar text-sm font-mono px-4 py-1.5 rounded-full mb-8 border border-solar/20">
              <span className="w-1.5 h-1.5 bg-solar rounded-full animate-pulse" />
              Research Phase — White Paper v1.2 Published
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-12">
              Eat The Sun
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/roadmap"
                className="bg-solar hover:bg-solar-bright text-background font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Explore the Roadmap
              </Link>
              <Link
                href="/research"
                className="border border-border hover:border-solar/50 text-foreground font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Read the Research
              </Link>
            </div>
          </div>
        </section>

        {/* ── Three Steps ── */}
        <section className="py-20 px-6 bg-surface">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center">
              The Path to Infinite Vibes
            </h2>

            <MissionDiagram />

            <div className="grid md:grid-cols-3 gap-8 mt-14">
              <div className="text-center">
                <div className="text-solar font-mono text-sm mb-2">STEP 1</div>
                <h3 className="font-bold text-lg mb-2">Orbital Ring</h3>
                <p className="text-muted text-sm leading-relaxed">
                  A ring around Earth at 100 km altitude. Reduces launch costs
                  from $2,700/kg to $1.40/kg — enabling everything that follows.
                </p>
              </div>
              <div className="text-center">
                <div className="text-solar font-mono text-sm mb-2">STEP 2</div>
                <h3 className="font-bold text-lg mb-2">Dyson Sphere</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Solar satellites manufactured from lunar material and launched
                  for free. Scale until we capture a meaningful fraction of the
                  Sun&apos;s total output.
                </p>
              </div>
              <div className="text-center">
                <div className="text-solar font-mono text-sm mb-2">STEP 3</div>
                <h3 className="font-bold text-lg mb-2">Relay to Earth</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Wireless power transmission from orbit to the surface. Clean,
                  continuous energy anywhere on Earth — 24/7, no weather, no
                  night.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Follow the Build ── */}
        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Follow the build
            </h2>
            <p className="text-muted max-w-xl mx-auto mb-10 leading-relaxed">
              We&apos;re doing this in the open — research, simulations, and
              hardware milestones as they happen. Drop your email to follow
              along, or become a patron to directly support the research.
            </p>
            <SubscribeForm />
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="py-8 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted">
              <SolarIcon className="w-4 h-4 text-solar" />
              <span>Infinite Vibes — 2026</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted">
              <Link
                href="/roadmap"
                className="hover:text-foreground transition-colors"
              >
                Roadmap
              </Link>
              <Link
                href="/research"
                className="hover:text-foreground transition-colors"
              >
                Research
              </Link>
              <Link
                href="https://github.com/vargasjr-dev/infinitevibes.solar"
                target="_blank"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
