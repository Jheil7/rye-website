// @ts-nocheck
import Card from "../_components/Card";
import { CLASS_BY_ID } from "src/classes";
import { warcraftlogsFetch } from "../../lib/warcraftlogs api/warcraftlogsfetch";
import { server } from "typescript";
import { fetchToken } from "../../blizzard api/blizzardfetch";
import { getAPI } from "../../blizzard api/blizzardfetch";

const zoneID = 44; //ZONE ID FOR THE CURRENT RAID, 44=MANAFORGE.

const warcraftlogsURL = "https://www.warcraftlogs.com/character/us";
const guildAPI =
  "https://us.api.blizzard.com/data/wow/guild/malganis/raise-your-eyes/roster?namespace=profile-us&locale=en_US";
const characterAPIPrefix = "https://us.api.blizzard.com/profile/wow/character/";
const characterAPISuffix = "?namespace=profile-us";

export default async function App() {
  const roster = await showRoster();
  const rosterCount = roster.length;

  const sortedRoster = [...roster].sort((a, b) =>
    a.character.name.localeCompare(b.character.name),
  );
  const enrichedRoster = await Promise.all(
    sortedRoster.map(async (m) => {
      const bestPerfAvg = await fetchBestParseAvg(
        m.character.name,
        m.character.realm.slug,
        zoneID,
      ).catch(() => ({ dpsAvg: null, hpsAvg: null }));
      return { ...m, ...bestPerfAvg };
    }),
  );
  return (
    <div className="mx-auto mt-6 max-w-6xl space-y-6 px-6">
      <Card>
        <h3 className="text-xl font-bold">Mythic Roster ({rosterCount})</h3>
        <li className="grid grid-cols-[30px_0.25fr_0.25fr_0.25fr_160px] items-center gap-3 py-2 text-lg">
          <div>Name</div>
          <div></div>
          <div>Class</div>
          <div>Best Parse Avg. (DPS/Heal)</div>
          <div>Warcraftlogs URL</div>
        </li>
        <ul>
          {enrichedRoster.map((member) => {
            const classId = member.character.playable_class.id;
            const wowClass = CLASS_BY_ID[classId];
            const logsURL = `${warcraftlogsURL}/${member.character.realm.slug}/${encodeURIComponent(member.character.name)}`;
            const playerURL = `${characterAPIPrefix}${member.character.realm.slug}/${encodeURIComponent(member.character.name.toLowerCase())}${characterAPISuffix}`;

            return (
              <li
                className="grid grid-cols-[30px_0.25fr_0.25fr_0.25fr_160px] items-center gap-3 py-2"
                key={member.character.id}
              >
                <img
                  src={wowClass.icon}
                  alt={wowClass.name}
                  className="h-8 w-8 rounded"
                />
                <span>{member.character.name}</span>

                <span className="text-sm opacity-70">
                  {" "}
                  {wowClass ? wowClass.name : `Class ${classId}`}{" "}
                </span>
                <span className="inline-flex items-center gap-1 text-lg">
                  <span className={getParseColor(member.dpsAvg)}>
                    {member.dpsAvg?.toFixed(1) ?? "—"}
                  </span>
                  <span className="opacity-60">/</span>
                  <span className={getParseColor(member.hpsAvg)}>
                    {member.hpsAvg?.toFixed(1) ?? "—"}
                  </span>
                </span>
                <a
                  href={logsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-blue-400 hover:underline"
                >
                  Link
                </a>

                {/* <span>{characterData.active_spec?.name ?? "Unknown Spec"}</span> */}
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

//incomplete getcharcter pull from blizzard
async function getCharacter(characterURL) {
  const characterFetch = await getAPI(characterURL);
  console.log(characterFetch);
  return characterFetch;
  // https://us.api.blizzard.com/profile/wow/character/area-52/Monkurial?namespace=profile-us
  // https://us.api.blizzard.com/profile/wow/character/area-52/monkurial?namespace=profile-us
  // /profile/wow/character/{realmSlug}/{characterName}?namespace=profile-us&locale=en_US
}

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
