import { NextResponse } from "next/server";
import { redis } from "~/server/redis";
import { warcraftlogsFetch } from "~/lib/warcraftlogs api/warcraftlogsfetch";

type RaidRankSnapshot = {
  capturedAt: string;
  raidTier: string;
  worldRank: number | null;
  serverRank: number | null;
};

type GuildRankResponse = {
  data?: {
    guildData?: {
      guild?: {
        zoneRanking?: {
          progress?: {
            worldRank?: {
              number?: number;
            };
            serverRank?: {
              number?: number;
            };
          };
        };
      };
    };
  };
};

function getWeekKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

async function fetchGuildRanks(zoneID: number): Promise<{
  worldRank: number | null;
  serverRank: number | null;
}> {
  const query = `query {
    guildData {
      guild(name: "Raise Your Eyes", serverSlug: "malganis", serverRegion: "US") {
        zoneRanking(zoneId: ${zoneID}) {
          progress {
            worldRank {
              number
            }
            serverRank {
              number
            }
          }
        }
      }
    }
  }`;

  const result = (await warcraftlogsFetch(query)) as GuildRankResponse;

  const progress = result.data?.guildData?.guild?.zoneRanking?.progress;

  return {
    worldRank: progress?.worldRank?.number ?? null,
    serverRank: progress?.serverRank?.number ?? null,
  };
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const cronHeader = req.headers.get("x-vercel-cron");
  const expected = `Bearer ${process.env.CRON_SECRET}`;

  const isAuthorized = authHeader === expected || cronHeader === "1";

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const raidTier = "midnight_s1";
  const zoneID = 46;
  const weekKey = getWeekKey();

  const redisKey = `raid_rank:${raidTier}:${weekKey}`;
  const indexKey = `raid_rank:${raidTier}:index`;

  const existing = await redis.get<RaidRankSnapshot>(redisKey);

  if (existing) {
    return NextResponse.json({
      ok: true,
      message: "Snapshot already exists for this week",
      redisKey,
      snapshot: existing,
    });
  }

  const { worldRank, serverRank } = await fetchGuildRanks(zoneID);

  if (worldRank == null && serverRank == null) {
    return NextResponse.json(
      {
        ok: false,
        message: "Warcraft Logs returned no raid rank data",
        raidTier,
        zoneID,
      },
      { status: 502 },
    );
  }

  const snapshot: RaidRankSnapshot = {
    capturedAt: new Date().toISOString(),
    raidTier,
    worldRank,
    serverRank,
  };

  await redis.set(redisKey, snapshot);
  await redis.lpush(indexKey, redisKey);

  return NextResponse.json({
    ok: true,
    message: "Snapshot saved",
    redisKey,
    snapshot,
  });
}
