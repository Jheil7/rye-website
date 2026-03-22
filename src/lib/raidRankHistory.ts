import { redis } from "~/server/redis";

export type RaidRankSnapshot = {
  capturedAt: string;
  raidTier: string;
  worldRank: number | null;
  serverRank: number | null;
};

export async function getLatestRaidRankSnapshot(
  raidTier: string,
): Promise<RaidRankSnapshot | null> {
  const indexKey = `raid_rank:${raidTier}:index`;

  const keys: string[] = await redis.lrange(indexKey, 0, 0);

  if (!keys.length) {
    return null;
  }

  const key = keys[0];
  if (!key) {
    return null;
  }

  const snapshot = await redis.get<RaidRankSnapshot>(key);
  return snapshot ?? null;
}

export type RankChange = {
  direction: "up" | "down" | "same";
  amount: number;
};

export function getRankChange(
  current: number | null,
  previous: number | null,
): RankChange | null {
  if (current == null || previous == null) {
    return null;
  }

  if (current < previous) {
    return {
      direction: "up",
      amount: previous - current,
    };
  }

  if (current > previous) {
    return {
      direction: "down",
      amount: current - previous,
    };
  }

  return {
    direction: "same",
    amount: 0,
  };
}
