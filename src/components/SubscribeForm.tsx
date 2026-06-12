"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong");
      }
      setStatus("success");
      setEmail("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  const patronLink = process.env.NEXT_PUBLIC_PATRON_LINK ?? "#";

  return (
    <div className="space-y-6">
      {/* Email subscription */}
      {status === "success" ? (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-6 py-5 text-center">
          <div className="text-green-400 font-medium mb-1">You&apos;re in.</div>
          <div className="text-muted text-sm">
            We&apos;ll send updates as we hit milestones.
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="your@email.com"
            required
            className="flex-1 bg-surface border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-solar/50 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-solar hover:bg-solar-bright disabled:opacity-60 text-background font-semibold px-6 py-3 rounded-lg transition-colors text-sm whitespace-nowrap"
          >
            {status === "loading" ? "..." : "Follow Along"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="text-red-400 text-sm text-center">{errorMsg}</p>
      )}

      {/* Patron divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-muted text-xs">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Patron CTA — price intentionally hidden until Stripe checkout */}
      <div className="text-center">
        <a
          href={patronLink}
          target={patronLink !== "#" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-solar/40 hover:border-solar text-solar hover:text-solar-bright font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 opacity-80"
          >
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
          Become a Patron
        </a>
      </div>
    </div>
  );
}
