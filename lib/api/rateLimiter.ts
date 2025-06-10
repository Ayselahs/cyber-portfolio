import { NextApiRequest, NextApiResponse } from "next";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

export async function rateLimiterNext(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    await rateLimiter.consume(ip as string);
  } catch {
    res.status(429).json({ error: "Too many requests. try again later." });
    throw new Error("rate limited");
  }
}
