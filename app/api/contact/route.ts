import { escape } from "validator";
import { getDatabase } from "../../../lib/mongodb";
import { rateLimiterNext } from "./rateLimiter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const rateLimitResponse = await rateLimiterNext(request);
  if (rateLimitResponse) return rateLimitResponse;

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof data !== "object" || data === null) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { name, email, topic, message, captchaToken } = data as Record<
    string,
    unknown
  >;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof topic !== "string" ||
    typeof message !== "string" ||
    typeof captchaToken !== "string"
  ) {
    return NextResponse.json(
      { error: "Invalid request parameters. " },
      { status: 400 }
    );
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY!;
  const verifyRes = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: captchaToken }),
    }
  );

  const verifyJson = (await verifyRes.json()) as {
    success: boolean;
    score?: number;
  };
  if (!verifyJson.success || (verifyJson.score ?? 0) < 0.5) {
    return NextResponse.json(
      { error: "CAPTCHA verification failed" },
      { status: 400 }
    );
  }

  try {
    const db = await getDatabase();
    await db.collection("contacts").insertOne({
      name: escape(name.trim()),
      email: escape(email.trim().toLowerCase()),
      topic: escape(topic.trim()),
      message: escape(message.trim()),
      submittedAt: new Date(),
    });
  } catch (err: unknown) {
    console.error("MongoDB insertion error:", err);
    return NextResponse.json(
      { error: "Database Error: Failed to save" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
