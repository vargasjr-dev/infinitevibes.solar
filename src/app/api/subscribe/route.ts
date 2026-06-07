import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let email: string | undefined;

  try {
    const body = await req.json();
    email = typeof body.email === "string" ? body.email.trim() : undefined;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Valid email required" },
      { status: 400 },
    );
  }

  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    // Notify Vargas that someone subscribed
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Infinite Vibes <hello@vargasjr.dev>",
        to: ["dvargas92495@gmail.com"],
        subject: "New Infinite Vibes subscriber",
        text: `New subscriber: ${email}`,
      }),
    }).catch(() => {
      // Non-fatal — don't fail the request if notification fails
    });

    // Send a welcome email to the subscriber
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Infinite Vibes <hello@vargasjr.dev>",
        to: [email],
        subject: "You're following the build",
        text: [
          "Thanks for signing up.",
          "",
          "We're building the cheapest path to limitless energy — an orbital ring that bootstraps itself from a $2M seed, eventually scaling to a Dyson sphere.",
          "",
          "We'll send you updates as we hit milestones. No noise, no newsletters — just real progress.",
          "",
          "— The Infinite Vibes team",
          "https://infinitevibes.solar",
        ].join("\n"),
      }),
    }).catch(() => {
      // Non-fatal
    });
  }

  return NextResponse.json({ ok: true });
}
