import { CLASS_BY_ID } from "~/classes";
import { getAPI } from "~/blizzard api/blizzardfetch";
import { warcraftlogsFetch } from "~/lib/warcraftlogs api/warcraftlogsfetch";
import { raiderIOData } from "../raiderio/raideriofetch";
import { RosterDirectory, type RosterDirectoryMember } from "./RosterDirectory";

const zoneID = 46;
const warcraftlogsURL = "https://www.warcraftlogs.com/character/us";
const guildAPI =
  "https://us.api.blizzard.com/data/wow/guild/malganis/raise-your-eyes/roster?namespace=profile-us&locale=en_US";
const characterAPIPrefix = "https://us.api.blizzard.com/profile/wow/character/";
const characterAPISuffix = "?namespace=profile-us";

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

export default async function RosterPage() {
  const roster = await showRoster();

  const sortedRoster = [...roster].sort((a, b) =>
    a.character.name.localeCompare(b.character.name),
  );

  const enrichedRoster: EnrichedMember[] = await Promise.all(
    sortedRoster.map(async (member) => {
      const [wcl, blizz, raiderIO] = await Promise.all([
        fetchBestParseAvg(
          member.character.name,
          member.character.realm.slug,
          zoneID,
        ).catch(() => ({ dpsAvg: null, hpsAvg: null })),

        getCharacter(
          member.character.realm.slug,
          member.character.name.toLowerCase(),
        )
          .then((character) => ({
            average_item_level: character?.average_item_level ?? null,
            activeSpecName: character?.active_spec?.name?.en_US ?? null,
          }))
          .catch(() => ({
            average_item_level: null,
            activeSpecName: null,
          })),

        fetchRaiderIOScore(
          member.character.name,
          member.character.realm.slug,
        ).catch(() => ({
          raiderIOScore: null,
        })),
      ]);

      return { ...member, ...wcl, ...blizz, ...raiderIO };
    }),
  );

  const members: RosterDirectoryMember[] = enrichedRoster.map((member) => {
    const classId = member.character.playable_class.id;
    const wowClass = CLASS_BY_ID[classId];

    return {
      id: member.character.id,
      name: member.character.name,
      className: wowClass?.name ?? `Class ${classId}`,
      classIcon: wowClass?.icon ?? "/logo.png",
      specName: member.activeSpecName,
      itemLevel: member.average_item_level,
      dpsAvg: member.dpsAvg,
      hpsAvg: member.hpsAvg,
      raiderIOScore: member.raiderIOScore,
      logsUrl: `${warcraftlogsURL}/${member.character.realm.slug}/${encodeURIComponent(
        member.character.name,
      )}`,
    };
  });

  return (
    <div className="mx-auto max-w-6xl px-6 pt-6 pb-24 sm:pt-8">
      <RosterDirectory members={members} />
    </div>
  );
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
  const character = fetchWCLJSON?.data?.characterData?.character;

  const dpsObj = character?.dps
    ? (parseZR(character.dps) as ZoneRankingParsed)
    : null;
  const hpsObj = character?.hps
    ? (parseZR(character.hps) as ZoneRankingParsed)
    : null;

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

  const data = (await raiderIOData(baseURL)) as RaiderIOResponse;
  const raiderIOScore =
    data.mythic_plus_scores_by_season?.[0]?.scores?.all ?? null;
  return { raiderIOScore };
}
