import Link from "next/link";
import Nav from "@/components/Nav";
import { buildSteps } from "@/data/build-steps";

export const metadata = {
  title: "Orbital Ring — Roadmap — Infinite Vibes",
  description:
    "The step-by-step engineering playbook for constructing an orbital ring. What gets manufactured, launched, assembled, and in what order.",
};

export default function RoadmapPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono px-2.5 py-1 rounded-full border bg-solar/10 text-solar border-solar/20">
                Engineering Playbook
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full border bg-muted/10 text-muted border-muted/20">
                Draft
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Orbital Ring
            </h1>
            <p className="text-muted text-lg mb-4">
              How do you actually build an orbital ring? Step by step — what
              gets manufactured, what gets launched, what gets assembled, and in
              what order.
            </p>
            <p className="text-muted text-sm">
              This is the minimum viable ring: a single Zylon cable rotor with
              tethered platforms. Enough to prove the concept and begin
              self-reinforcing growth. Total cost target: ~$2-3M.
            </p>
          </div>

          {/* Step cards */}
          <div className="grid gap-4">
            {buildSteps.map((step) => (
              <Link
                key={step.slug}
                href={`/roadmap/orbital-ring/${step.slug}`}
                className="group bg-surface border border-border rounded-xl p-5 hover:border-solar/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Step number */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-solar/10 border border-solar/30 flex items-center justify-center font-mono font-bold text-sm text-solar">
                    {step.step}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold group-hover:text-solar transition-colors">
                        {step.title}
                      </h2>
                      {step.subSteps && (
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-solar/10 text-solar border border-solar/20">
                          {step.subSteps.length} sub-steps
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-muted mb-2">
                      {step.location}
                    </div>
                    <p className="text-muted text-sm leading-relaxed line-clamp-2">
                      {step.description}
                    </p>

                    {/* Quick stats */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted">
                      <span>{step.specs.length} specs</span>
                      <span>
                        {step.openQuestions.length} open question
                        {step.openQuestions.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
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
                </div>
              </Link>
            ))}
          </div>

          {/* What comes after */}
          <div className="mt-8 bg-surface border border-border rounded-xl p-8">
            <div className="text-sm font-mono text-solar mb-3 uppercase tracking-wider">
              After Step 10
            </div>
            <h2 className="text-xl font-bold mb-3">The ring is operational</h2>
            <p className="text-muted text-sm leading-relaxed mb-4">
              A resilient orbital ring with 34+ tether stations, delivering
              1,200+ tonnes per year to orbit at ~$1.40/kg. From here, the
              roadmap extends to lunar material integration, solar power
              satellite manufacturing, and eventually a Dyson swarm. But the
              hard part is done — getting to orbit is no longer the bottleneck.
            </p>
            <Link
              href="/research/incremental-bootstrap-architecture"
              className="text-solar hover:text-solar-bright text-sm font-medium transition-colors"
            >
              Read the white paper →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
