import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

const limiter = new RateLimiterMemory({ points: 5, duration: 60 });

export async function rateLimiterNext(request: NextRequest) {
  const xff = request.headers.get("x-forwarded-for") ?? "";
  const ip = xff.split(",")[0] || "unkown";
  try {
    await limiter.consume(ip);
  } catch {
    return NextResponse.json(
      { error: "Too many requests. Please try agian later." },
      { status: 429 }
    );
  }
}
