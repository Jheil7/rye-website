// @ts-nocheck
import { redis } from "./redis";
import { fetchTokenWCL } from "../lib/warcraftlogs api/warcraftlogsfetch";
const TOKEN_KEY = "wcl:access_token";

export async function getWclAccessToken(fetchTokenWCL) {
  // 1) Try Redis first
  const cached = await redis.get(TOKEN_KEY);

  if (cached?.token && cached?.expiresAt > Date.now()) {
    console.log("cached wcl token?", !!cached);
    return cached.token;
  }

  // 2) Not cached (or expired): fetch a new one
  const { accessToken, expiresIn } = await fetchTokenWCL();

  const expiresAt = Date.now() + expiresIn * 1000;

  console.log("expiresIn", expiresIn);
  // 3) Store it in Redis + set TTL slightly shorter than expiry
  await redis.set(TOKEN_KEY, { token: accessToken, expiresAt });
  await redis.expire(TOKEN_KEY, Math.max(60, expiresIn - 60)); // buffer

  return accessToken;
}
