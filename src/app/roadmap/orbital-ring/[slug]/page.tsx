import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { buildSteps, getStepBySlug, getAllSlugs } from "@/data/build-steps";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const step = getStepBySlug(slug);
  if (!step) return { title: "Not Found — Infinite Vibes" };
  return {
    title: `Step ${step.step}: ${step.title} — Orbital Ring — Infinite Vibes`,
    description: step.description,
  };
}

export default async function RoadmapStepPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const step = getStepBySlug(slug);
  if (!step) notFound();

  const stepIndex = buildSteps.findIndex((s) => s.slug === slug);
  const prevStep = stepIndex > 0 ? buildSteps[stepIndex - 1] : null;
  const nextStep =
    stepIndex < buildSteps.length - 1 ? buildSteps[stepIndex + 1] : null;

  return (
    <>
      <Nav />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted mb-6">
            <Link
              href="/roadmap/orbital-ring"
              className="hover:text-foreground transition-colors"
            >
              Orbital Ring
            </Link>
            <span>/</span>
            <span className="text-foreground">Step {step.step}</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-solar/10 border border-solar/30 flex items-center justify-center font-mono font-bold text-sm text-solar">
                {step.step}
              </div>
              <span className="text-xs font-mono text-muted">
                {step.location}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {step.title}
            </h1>
            <p className="text-muted leading-relaxed">{step.description}</p>
          </div>

          {/* Specs */}
          <div className="mb-10">
            <h2 className="text-sm font-mono text-solar mb-3 uppercase tracking-wider">
              Specifications
            </h2>
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              {step.specs.map((spec, i) => (
                <div
                  key={i}
                  className={`flex justify-between px-5 py-3 text-sm ${
                    i < step.specs.length - 1 ? "border-b border-border/50" : ""
                  }`}
                >
                  <span className="text-muted">{spec.label}</span>
                  <span className="font-mono font-medium text-right">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-steps (deep dive) */}
          {step.subSteps && step.subSteps.length > 0 && (
            <div className="mb-10">
              <h2 className="text-sm font-mono text-solar mb-4 uppercase tracking-wider">
                Deep Dive — {step.subSteps.length} Sub-Steps
              </h2>
              <div className="space-y-6">
                {step.subSteps.map((sub, i) => (
                  <div
                    key={i}
                    className={`bg-surface border rounded-xl overflow-hidden ${
                      sub.status === "resolved"
                        ? "border-green-500/30"
                        : "border-border"
                    }`}
                  >
                    <div className="px-5 py-4 border-b border-border/50">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-solar/10 text-solar">
                          {step.step}.{i + 1}
                        </span>
                        <span
                          className={`text-xs font-mono px-2 py-0.5 rounded ${
                            sub.status === "resolved"
                              ? "bg-green-500/10 text-green-400"
                              : sub.status === "in-progress"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-muted/10 text-muted"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold">{sub.title}</h3>
                      {sub.answersQuestion && (
                        <div className="mt-2 text-xs text-muted flex gap-1.5">
                          <span className="text-solar/60 flex-shrink-0">→</span>
                          <span>Addresses: {sub.answersQuestion}</span>
                        </div>
                      )}
                    </div>

                    {/* Resolution banner for resolved steps */}
                    {sub.status === "resolved" && sub.resolution && (
                      <div className="px-5 py-4 bg-green-500/5 border-b border-border/50">
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-green-400 flex-shrink-0 mt-0.5">
                            ✓
                          </span>
                          <p className="text-sm font-medium text-green-300">
                            {sub.resolution.summary}
                          </p>
                        </div>
                        <details className="group ml-5">
                          <summary className="text-xs text-muted cursor-pointer hover:text-foreground transition-colors select-none">
                            Show rationale
                          </summary>
                          {sub.resolution.rationale.includes("\n\n") ? (
                            sub.resolution.rationale
                              .split("\n\n")
                              .map((para, k) => (
                                <p
                                  key={k}
                                  className={`text-xs text-muted leading-relaxed ${k === 0 ? "mt-2" : "mt-3"}`}
                                >
                                  {para}
                                </p>
                              ))
                          ) : (
                            <p className="mt-2 text-xs text-muted leading-relaxed">
                              {sub.resolution.rationale}
                            </p>
                          )}
                        </details>
                      </div>
                    )}

                    <div className="px-5 py-4">
                      {sub.description.includes("\n\n") ? (
                        sub.description.split("\n\n").map((para, k) => (
                          <p
                            key={k}
                            className="text-muted text-sm leading-relaxed mb-4"
                          >
                            {para}
                          </p>
                        ))
                      ) : (
                        <p className="text-muted text-sm leading-relaxed mb-4">
                          {sub.description}
                        </p>
                      )}

                      {sub.specs && sub.specs.length > 0 && (
                        <div className="bg-background border border-border/50 rounded-lg overflow-hidden">
                          {sub.specs.map((spec, j) => (
                            <div
                              key={j}
                              className={`flex justify-between px-4 py-2.5 text-sm ${
                                j < sub.specs!.length - 1
                                  ? "border-b border-border/30"
                                  : ""
                              }`}
                            >
                              <span className="text-muted">{spec.label}</span>
                              <span className="font-mono font-medium text-right">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Open questions */}
          <div className="mb-10">
            <h2 className="text-sm font-mono text-solar mb-3 uppercase tracking-wider">
              Open Questions
            </h2>
            <div className="bg-solar/5 border border-solar/20 rounded-xl px-5 py-4">
              <ul className="space-y-2">
                {step.openQuestions.map((q, i) => (
                  <li key={i} className="text-sm text-muted flex gap-2">
                    <span className="text-solar/60 flex-shrink-0 mt-0.5">
                      ?
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Prev / Next navigation */}
          <div className="flex items-center justify-between gap-4 pt-6 border-t border-border">
            {prevStep ? (
              <Link
                href={`/roadmap/orbital-ring/${prevStep.slug}`}
                className="group flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>
                  <span className="text-muted">Step {prevStep.step}:</span>{" "}
                  {prevStep.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextStep ? (
              <Link
                href={`/roadmap/orbital-ring/${nextStep.slug}`}
                className="group flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors text-right"
              >
                <span>
                  <span className="text-muted">Step {nextStep.step}:</span>{" "}
                  {nextStep.title}
                </span>
                <svg
                  className="w-4 h-4"
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
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
