import Card from "../_components/Card";
import { CLASS_BY_ID, type WowClass } from "src/classes";
import { warcraftlogsFetch } from "../../lib/warcraftlogs api/warcraftlogsfetch";
import { getAPI } from "../../blizzard api/blizzardfetch";
import { fetchRaiderIO } from "../raiderio/raideriofetch";

const zoneID = 44; // 44 = Manaforge

// API prefixes/suffixes
const warcraftlogsURL = "https://www.warcraftlogs.com/character/us";
const guildAPI =
  "https://us.api.blizzard.com/data/wow/guild/malganis/raise-your-eyes/roster?namespace=profile-us&locale=en_US";
const characterAPIPrefix = "https://us.api.blizzard.com/profile/wow/character/";
const characterAPISuffix = "?namespace=profile-us";

// className for roster
const columnStructure =
  "grid grid-cols-[30px_0.15fr_0.25fr_0.1fr_0.2fr_0.2fr_160px] items-center gap-4 py-2 text-lg";

/* ---------------- Types (minimal, only what we use) ---------------- */

type GuildMember = {
  rank: number;
  character: {
    id: number;
    name: string;
    realm: { slug: string };
    playable_class: { id: number };
  };
};

type GuildRosterResponse = {
  members: GuildMember[];
};

type EnrichedMember = GuildMember & {
  dpsAvg: number | null;
  hpsAvg: number | null;
  average_item_level: number | null;
  activeSpecName: string | null;
  raiderIOScore: number | null;
};

type CharacterResponse = {
  average_item_level?: number;
  active_spec?: { name?: LocalizedString };
};

type ZoneRankingParsed = {
  bestPerformanceAverage?: number;
};

type WCLResponse = {
  data?: {
    characterData?: {
      character?: {
        dps?: unknown;
        hps?: unknown;
      };
    };
  };
};

type RaiderIOResponse = {
  mythic_plus_scores_by_season?: Array<{
    scores?: { all?: number };
  }>;
};

type LocalizedString = {
  en_US?: string;
  [key: string]: string | undefined;
};

/* ---------------- Page ---------------- */

export default async function App() {
  const roster = await showRoster();
  const rosterCount = roster.length;

  const sortedRoster = [...roster].sort((a, b) =>
    a.character.name.localeCompare(b.character.name),
  );

  const enrichedRoster: EnrichedMember[] = await Promise.all(
    sortedRoster.map(async (m) => {
      const [wcl, blizz, raiderIO] = await Promise.all([
        fetchBestParseAvg(
          m.character.name,
          m.character.realm.slug,
          zoneID,
        ).catch(() => ({ dpsAvg: null, hpsAvg: null })),

        getCharacter(m.character.realm.slug, m.character.name.toLowerCase())
          .then((c) => ({
            average_item_level: c?.average_item_level ?? null,
            activeSpecName: c?.active_spec?.name?.en_US ?? null,
          }))
          .catch(() => ({ average_item_level: null, activeSpecName: null })),

        fetchRaiderIOScore(m.character.name, m.character.realm.slug).catch(
          () => ({
            raiderIOScore: null,
          }),
        ),
      ]);

      return { ...m, ...wcl, ...blizz, ...raiderIO };
    }),
  );

  return (
    <div className="mx-auto mt-6 max-w-6xl space-y-6 px-6">
      <Card>
        <h3 className="text-xl font-bold">Mythic Roster ({rosterCount})</h3>

        <li className={columnStructure}>
          <div>Name</div>
          <div></div>
          <div>Current Spec/Class</div>
          <div>Ilvl</div>
          <div className="leading-tight">
            <span className="block">Best Parse Avg.</span>
            <span className="block">(DPS/Heal)</span>
          </div>
          <div>M+ Score</div>
          <div>Warcraftlogs URL</div>
        </li>

        <ul>
          {enrichedRoster.map((member) => {
            const classId: number = member.character.playable_class.id;
            const wowClass: WowClass | undefined = CLASS_BY_ID[classId];
            const logsURL = `${warcraftlogsURL}/${member.character.realm.slug}/${encodeURIComponent(
              member.character.name,
            )}`;

            return (
              <li className={columnStructure} key={member.character.id}>
                {/* icon */}
                <img
                  src={wowClass?.icon}
                  alt={wowClass?.name ?? `Class ${classId}`}
                  className="h-8 w-8 rounded"
                />

                {/* name */}
                <span className="text-lg">{member.character.name}</span>

                {/* class/spec */}
                <span className="text-lg opacity-70">
                  {member.activeSpecName ?? "—"}{" "}
                  {wowClass ? wowClass.name : `Class ${classId}`}
                </span>

                {/* Ilvl */}
                <span className="text-lg">
                  {member.average_item_level ?? "—"}
                </span>

                {/* avg parse */}
                <span className="inline-flex items-center gap-1 text-lg">
                  <span className={getParseColor(member.dpsAvg)}>
                    {member.dpsAvg?.toFixed(1) ?? "—"}
                  </span>
                  <span className="opacity-60">/</span>
                  <span className={getParseColor(member.hpsAvg)}>
                    {member.hpsAvg?.toFixed(1) ?? "—"}
                  </span>
                </span>

                {/* raiderio score */}
                <span className="text-lg">{member.raiderIOScore ?? "—"}</span>

                {/* warcraftlogs URL */}
                <a
                  href={logsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-blue-400 hover:underline"
                >
                  WCL/{member.character.name}
                </a>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}

/* ---------------- Helpers ---------------- */

function getParseColor(avg: number | null): string {
  if (typeof avg !== "number") return "text-gray-400";
  if (avg >= 95) return "text-orange-400";
  if (avg >= 75) return "text-purple-500";
  if (avg >= 50) return "text-blue-500";
  if (avg >= 25) return "text-green-500";
  return "text-gray-400";
}

async function showRoster(): Promise<GuildMember[]> {
  const rosterFetch = (await getAPI(guildAPI)) as GuildRosterResponse;
  return rosterFetch.members.filter((member) => member.rank <= 2);
}

async function getCharacter(
  realm: string,
  name: string,
): Promise<CharacterResponse> {
  const playerURL = `${characterAPIPrefix}${realm}/${encodeURIComponent(name)}${characterAPISuffix}`;
  return (await getAPI(playerURL)) as CharacterResponse;
}

function parseZR(zr: unknown): unknown {
  return typeof zr === "string" ? JSON.parse(zr) : zr;
}

async function fetchBestParseAvg(
  characterName: string,
  serverSlug: string,
  currentRaid: number,
): Promise<{ dpsAvg: number | null; hpsAvg: number | null }> {
  const query = `
  query {
    characterData {
      character(
        name: "${characterName}"
        serverSlug: "${serverSlug}"
        serverRegion: "US"
      ) {
        dps: zoneRankings(zoneID: ${currentRaid}, metric: dps)
        hps: zoneRankings(zoneID: ${currentRaid}, metric: hps)
      }
    }
  }
`;

  const fetchWCLJSON = (await warcraftlogsFetch(query)) as WCLResponse;
  const char = fetchWCLJSON?.data?.characterData?.character;

  const dpsObj = char?.dps ? (parseZR(char.dps) as ZoneRankingParsed) : null;
  const hpsObj = char?.hps ? (parseZR(char.hps) as ZoneRankingParsed) : null;

  return {
    dpsAvg: dpsObj?.bestPerformanceAverage ?? null,
    hpsAvg: hpsObj?.bestPerformanceAverage ?? null,
  };
}

async function fetchRaiderIOScore(
  characterName: string,
  serverSlug: string,
): Promise<{ raiderIOScore: number | null }> {
  const baseURL = `https://raider.io/api/v1/characters/profile?access_key=${process.env.RAIDERIO_API_KEY}&region=us&realm=${encodeURIComponent(
    serverSlug,
  )}&name=${encodeURIComponent(characterName)}&fields=mythic_plus_scores_by_season%3Acurrent`;

  const data = (await fetchRaiderIO(baseURL)) as RaiderIOResponse;
  const raiderIOScore =
    data.mythic_plus_scores_by_season?.[0]?.scores?.all ?? null;
  return { raiderIOScore };
}
