// @ts-nocheck
import Card from "../_components/Card";
import { CLASS_BY_ID } from "src/classes";
import { warcraftlogsFetch } from "../../lib/warcraftlogs api/warcraftlogsfetch";
import { server } from "typescript";
import { fetchToken } from "../../blizzard api/blizzardfetch";
import { getAPI } from "../../blizzard api/blizzardfetch";
import { fetchRaiderIO } from "../raiderio/raideriofetch";

const zoneID = 44; //ZONE ID FOR THE CURRENT RAID, 44=MANAFORGE.

//API prefixes/suffixes
const warcraftlogsURL = "https://www.warcraftlogs.com/character/us";
const guildAPI =
  "https://us.api.blizzard.com/data/wow/guild/malganis/raise-your-eyes/roster?namespace=profile-us&locale=en_US";
const characterAPIPrefix = "https://us.api.blizzard.com/profile/wow/character/";
const characterAPISuffix = "?namespace=profile-us";

//className for roster
const columnStructure =
  "grid grid-cols-[30px_0.15fr_0.25fr_0.1fr_0.2fr_0.2fr_160px] items-center gap-4 py-2 text-lg";

export default async function App() {
  const roster = await showRoster();
  const rosterCount = roster.length;

  const sortedRoster = [...roster].sort((a, b) =>
    a.character.name.localeCompare(b.character.name),
  );
  const enrichedRoster = await Promise.all(
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
            active_spec: c?.active_spec?.name ?? null,
          }))
          .catch(() => ({ average_item_level: null, active_spec: null })),

        fetchRaiderIOScore(m.character.name, m.character.realm.slug).catch(
          () => ({ raiderIOScore: null }),
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
            const classId = member.character.playable_class.id;
            const wowClass = CLASS_BY_ID[classId];
            const logsURL = `${warcraftlogsURL}/${member.character.realm.slug}/${encodeURIComponent(member.character.name)}`;

            return (
              <li className={columnStructure} key={member.character.id}>
                {/* icon */}
                <img
                  src={wowClass.icon}
                  alt={wowClass.name}
                  className="h-8 w-8 rounded"
                />
                {/* name */}
                <span className="text-lg">{member.character.name}</span>

                {/* class/spec */}
                <span className="text-lg opacity-70">
                  {member.active_spec.en_US ?? "—"}{" "}
                  {wowClass ? wowClass.name : `Class ${classId}`}{" "}
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

function getParseColor(avg) {
  if (typeof avg !== "number") return "text-gray-400";
  if (avg >= 95) return "text-orange-400";
  if (avg >= 75) return "text-purple-500";
  if (avg >= 50) return "text-blue-500";
  if (avg >= 25) return "text-green-500";
  return "text-gray-400";
}

//pull guild from blizzard API function
async function showRoster() {
  const rosterFetch = await getAPI(guildAPI);

  const filteredMembers = rosterFetch.members.filter((member) => {
    return member.rank <= 2;
  });

  return filteredMembers;
}

//character Blizzard API pull
async function getCharacter(realm, name) {
  const playerURL = `${characterAPIPrefix}${realm}/${encodeURIComponent(name)}${characterAPISuffix}`;
  const characterFetch = await getAPI(playerURL);
  return characterFetch;
}
// /profile/wow/character/{realmSlug}/{characterName}?namespace=profile-us&locale=en_US

function parseZR(zr) {
  return typeof zr === "string" ? JSON.parse(zr) : zr;
}
//fetch best parse from warcraftlogs
async function fetchBestParseAvg(characterName, serverSlug, currentRaid) {
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

  const fetchWCLJSON = await warcraftlogsFetch(query);

  const char = fetchWCLJSON?.data?.characterData?.character;

  const dpsObj = char?.dps ? parseZR(char.dps) : null;

  const hpsObj = char?.hps ? parseZR(char.hps) : null;

  return {
    dpsAvg: dpsObj?.bestPerformanceAverage ?? null,
    hpsAvg: hpsObj?.bestPerformanceAverage ?? null,
  };
}

async function fetchRaiderIOScore(characterName, serverSlug) {
  const baseURL = `https://raider.io/api/v1/characters/profile?access_key=${process.env.RAIDERIO_API_KEY}&region=us&realm=${encodeURIComponent(serverSlug)}&name=${encodeURIComponent(characterName)}&fields=mythic_plus_scores_by_season%3Acurrent`;
  const fetchRaiderIOScore = await fetchRaiderIO(baseURL);
  const raiderIOScore =
    fetchRaiderIOScore.mythic_plus_scores_by_season?.[0]?.scores?.all ?? null;
  console.log(raiderIOScore);
  return { raiderIOScore };
}
