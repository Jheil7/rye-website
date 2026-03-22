// @ts-nocheck
import Navbar from "./_components/Navbar";
import { CLASSES } from "src/classes";
import { FaDiscord } from "react-icons/fa";
import { FaBattleNet } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Card from "./_components/Card";
import { warcraftlogsFetch } from "../lib/warcraftlogs api/warcraftlogsfetch";
import { fetchRaiderIO, raiderIOData } from "./raiderio/raideriofetch";
import {
  getLatestRaidRankSnapshot,
  getRankChange,
} from "~/lib/raidRankHistory";

const zoneID = 46; //midnight
const rolesNeeded = [];
const warcraftlogspage =
  "https://www.warcraftlogs.com/guild/us/malganis/raise%20your%20eyes";
const raideriopage = "https://raider.io/guilds/us/malganis/Raise%20Your%20Eyes";

const underlineClassName = "mb-2 border-b border-slate-600 pb-1";

const usefulResources = [
  {
    name: "Mythic Trap",
    url: "https://www.mythictrap.com/en",
    description: "Boss mechanics and raid guides",
  },

  {
    name: "Archon",
    url: "https://www.archon.gg/wow",
    description: "Meta class builds and statistics",
  },
  {
    name: "Lorrgs",
    url: "https://lorrgs.io/",
    description: "Check fight timings to compare cooldown usage.",
  },

  {
    name: "Larias' Guide",
    url: "https://docs.google.com/document/d/e/2PACX-1vTGkZ2Cjr0jlv90XqW9vy9VXsVucd-yMCgHdyCvX_kQfOrexNDAC7Lf3LifuhqxrcWqJ0W3zIhvK3ii/pub",
    description: "Guide to starting the season and what to do with crests",
  },
];

export default function Home() {
  return (
    <div className="mx-auto mt-6 max-w-6xl space-y-6 px-6">
      <AboutSection />

      <div className="grid items-stretch gap-3 md:grid-cols-[1fr_2fr] md:grid-rows-2">
        <RaidSchedule />

        <img
          src="CE.png"
          alt="Cutting Edge Photo"
          className="h-full w-full rounded-lg border border-slate-400 object-cover md:row-span-2"
        />
        <LinksSection />
      </div>
      <RaidProgress />
      <div className="grid items-stretch gap-3 md:grid-cols-[2fr_1fr]">
        <img
          src="Dimensius.png"
          alt="Dimensius"
          className="h-full w-full rounded-lg border border-slate-400 object-cover"
        />

        <RolesSection />
      </div>
      <div className="grid items-stretch gap-3 md:grid-cols-[1fr_1fr]">
        <Contact />
        <UsefulResources />
      </div>
      <footer className="mt-12 border-t border-slate-700 pt-4 pb-6 text-center text-sm text-slate-400">
        {new Date().getFullYear()} Raise Your Eyes • Mal'Ganis-US
      </footer>
    </div>
  );
}
// <div className="grid items-stretch gap-3 md:grid-cols-2 md:grid-rows-[1fr_auto]">

function AboutSection() {
  return (
    <div>
      <Card>
        <div>
          <div className={underlineClassName}>
            <h2 className="text-center text-2xl font-bold">About Us</h2>
          </div>
          <h3 className="text-md">
            <p>
              {`Welcome to Raise Your Eyes, a Cutting Edge raiding guild on
            Mal'Ganis – US. Our guild was created with the intention of
            providing exceptional players, many of which are returning to WoW
            after years away, an avenue through which to advance their abilities
            while progressing through Heroic/Mythic raids. We offer a
            semi-hardcore environment which means while we do check parses and
            evaluate raider performance we value player improvement over raw
            numbers. Raise Your Eyes is a guild where all voices can be heard.
            We have no “core officer group” of IRL friends who have played
            together for 10 years, instead, we have come together as a group
            where every raider can voice their opinion.`}
            </p>
          </h3>
        </div>
      </Card>
    </div>
  );
}

function RaidSchedule() {
  // const raidTimeUTC = "2024-01-03T02:00:00Z";
  // const localTime = new Date(raidTimeUTC);
  // const formatted = localTime.toLocaleTimeString([], {
  //   hour: "numeric",
  //   minute: "2-digit",
  // });
  //const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <div>
      <Card>
        <div>
          <div className={underlineClassName}>
            <h2 className="text-2xl font-bold">Raid Schedule</h2>
          </div>
          <h3 className="text-md">Tuesday 9:00pm-12:00am EST</h3>
          <h3 className="text-md">Thursday 9:00pm-12:00am EST</h3>
          {/* <h3 className="text-lg">
            {formatted} ({timezone}).
          </h3> */}
        </div>
      </Card>
    </div>
  );
}

function RolesSection() {
  return (
    <div>
      <Card>
        <div className={underlineClassName}>
          <h2 className="text-2xl font-bold">Roles Needed</h2>
        </div>
        <div className="mt-2 space-y-3">
          {rolesNeeded.map(({ classKey, specKey }) => {
            const cls = CLASSES[classKey];
            const spec = specKey ? cls.specs?.[specKey] : null;

            return (
              <div
                key={`${classKey}:${specKey ?? "class"}`}
                className="flex items-center gap-3"
              >
                <img
                  src={spec ? spec.icon : cls.icon}
                  alt={spec ? `${spec.name} ${cls.name}` : cls.name}
                  className="h-8 w-8"
                />
                <span>{spec ? `${spec.name} ${cls.name}` : cls.name}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          Currently accepting all experienced raiders. Ranged dps are currently
          the top priority.
        </div>
      </Card>
    </div>
  );
}

async function RaidProgress() {
  const worldRankQuery = `query {
    guildData {
      guild(name: "Raise Your Eyes", serverSlug: "malganis", serverRegion: "US"){
          zoneRanking(zoneId:${zoneID}){
                  progress{
                      worldRank{
                          number
                      }
                      serverRank{
                          number
                      }
                  }
              }
          }
      }
  }`;

  const guildRankFetch = await warcraftlogsFetch(worldRankQuery);
  const worldRank =
    guildRankFetch?.data?.guildData?.guild?.zoneRanking?.progress?.worldRank
      ?.number;

  const serverRank =
    guildRankFetch?.data?.guildData?.guild?.zoneRanking?.progress?.serverRank
      ?.number;

  const highestBoss = await fetchHighestBossProgress();
  const highestBossName = highestBoss.bossName;
  const highestBossPercentage = highestBoss.bossPercentage;
  const difficultyAbbreviations = {
    normal: "N",
    heroic: "H",
    mythic: "M",
  };
  const highestBossDifficulty =
    difficultyAbbreviations[highestBoss.difficulty?.toLowerCase()] ??
    highestBoss.difficulty;

  const latestSnapshot = await getLatestRaidRankSnapshot("midnight_s1");

  const worldRankChange = getRankChange(
    worldRank,
    latestSnapshot?.worldRank ?? null,
  );
  const serverRankChange = getRankChange(
    serverRank,
    latestSnapshot?.serverRank ?? null,
  );
  return (
    <Card>
      <div className={underlineClassName}>
        <h2 className="mb-1 text-center text-2xl font-bold">Raid Progress</h2>
      </div>

      <div className="grid gap-3 text-center md:grid-cols-3">
        <Card className="flex h-full flex-col border-slate-500/80 bg-slate-600/40 py-5">
          <h2 className="text-sm font-semibold text-slate-200">
            Current guild rank (world)
          </h2>

          <div className="mt-3 flex flex-1 items-center justify-center">
            <p className="text-4xl leading-tight font-bold">#{worldRank}</p>
          </div>

          {worldRankChange ? (
            <div
              className={`mt-3 rounded-full py-1 text-center text-sm font-semibold ${
                worldRankChange.direction === "up"
                  ? "border border-green-500/40 bg-green-500/15 text-green-400"
                  : worldRankChange.direction === "down"
                    ? "border border-red-500/40 bg-red-500/15 text-red-400"
                    : "border border-slate-500/40 bg-slate-500/10 text-slate-300"
              }`}
            >
              {worldRankChange.direction === "up" &&
                `↑ ${worldRankChange.amount} from last week`}
              {worldRankChange.direction === "down" &&
                `↓ ${worldRankChange.amount} from last week`}
              {worldRankChange.direction === "same" &&
                "No change from last week"}
            </div>
          ) : (
            <div className="mt-3 rounded-full border border-slate-500/40 bg-slate-500/10 py-1 text-center text-sm font-semibold text-slate-300">
              No previous data
            </div>
          )}
        </Card>

        <Card className="flex h-full flex-col border-slate-500/80 bg-slate-600/40 py-5">
          <h2 className="text-sm font-semibold text-slate-200">
            Current guild rank (server)
          </h2>

          <div className="mt-3 flex flex-1 items-center justify-center">
            <p className="text-4xl leading-tight font-bold">#{serverRank}</p>
          </div>

          {serverRankChange ? (
            <div
              className={`mt-3 rounded-full py-1 text-center text-sm font-semibold ${
                serverRankChange.direction === "up"
                  ? "border border-green-500/40 bg-green-500/15 text-green-400"
                  : serverRankChange.direction === "down"
                    ? "border border-red-500/40 bg-red-500/15 text-red-400"
                    : "border border-slate-500/40 bg-slate-500/10 text-slate-300"
              }`}
            >
              {serverRankChange.direction === "up" &&
                `↑ ${serverRankChange.amount} from last week`}
              {serverRankChange.direction === "down" &&
                `↓ ${serverRankChange.amount} from last week`}
              {serverRankChange.direction === "same" &&
                "No change from last week"}
            </div>
          ) : (
            <div className="mt-3 rounded-full border border-slate-500/40 bg-slate-500/10 py-1 text-center text-sm font-semibold text-slate-300">
              No previous data
            </div>
          )}
        </Card>

        <Card className="flex h-full flex-col border-slate-500/80 bg-slate-600/40 py-5">
          <h2 className="text-sm font-semibold text-slate-200">
            Current boss progress
          </h2>

          <div className="mt-3 flex flex-1 flex-col justify-center">
            <p className="text-2xl leading-tight font-bold">
              Heroic {highestBossName}
            </p>

            <p
              className={`mt-2 text-lg font-semibold ${
                highestBossPercentage === 0
                  ? "text-green-400"
                  : "text-slate-100"
              }`}
            >
              {highestBossPercentage}%
            </p>
          </div>

          {highestBossPercentage === 0 ? (
            <div className="mt-3 rounded-full border border-green-500/40 bg-green-500/15 py-1 text-center text-sm font-semibold text-green-400">
              Boss Defeated
            </div>
          ) : (
            <div className="mt-3 h-2 w-full rounded-full bg-slate-800">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getHealthColor(highestBossPercentage)}`}
                style={{ width: `${highestBossPercentage}%` }}
              />
            </div>
          )}
        </Card>
      </div>
    </Card>
  );
}

async function fetchHighestBossProgress() {
  const buildBossProgressUrl = (difficulty) =>
    `https://raider.io/api/v1/live-tracking/guild/boss-progress?access_key=${process.env.RAIDERIO_API_KEY}&raid=tier-mn-1&boss=latest&difficulty=${difficulty}&period=until_kill&region=us&realm=Mal-Ganis&guild=Raise%20your%20eyes`;

  let bossData;

  try {
    bossData = await raiderIOData(buildBossProgressUrl("mythic"));
  } catch {
    bossData = null;
  }

  if (!bossData?.boss?.name) {
    try {
      bossData = await raiderIOData(buildBossProgressUrl("heroic"));
    } catch {
      bossData = null;
    }
  }

  return {
    bossName: bossData?.boss?.name ?? null,
    bossPercentage: bossData?.bestPercent ?? null,
    difficulty: bossData?.raid?.difficulty ?? null,
  };
}

function getHealthColor(percent) {
  if (percent >= 75) return "bg-green-500";
  if (percent >= 50) return "bg-yellow-400";
  if (percent >= 25) return "bg-orange-400";
  return "bg-red-500";
}

function LinksSection() {
  return (
    <Card>
      <div className={underlineClassName}>
        <h2 className="text-2xl font-bold">Links</h2>
      </div>
      <div className="text-xl">
        <a
          href={warcraftlogspage}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-blue-400 hover:underline"
        >
          Warcraft Logs
        </a>
      </div>
      <div className="text-xl">
        <a
          href={raideriopage}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-blue-400 hover:underline"
        >
          raider.io
        </a>
      </div>
    </Card>
  );
}

function Contact() {
  return (
    <div className="max-w-xl">
      <Card id="contact">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className={underlineClassName}>
              <h2 className="text-2xl font-bold">Contact</h2>
            </div>
            <p className="mt-1 text-sm opacity-70">Reach out to our GM</p>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <FaDiscord size={22} className="opacity-80" />
                <span>
                  <span className="opacity-70">Discord:</span> dwarf1
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaBattleNet size={22} className="opacity-80" />
                <span>
                  <span className="opacity-70">Battle.net:</span> Matt#15352
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaUser size={22} className="opacity-80" />
                <span>
                  <span className="opacity-70">Main:</span> Ytu-Mal&apos;Ganis
                </span>
              </div>
            </div>
          </div>

          <img
            src="Matt.png"
            alt="picture of GM"
            className="h-48 w-48 rounded-lg"
          />
        </div>
      </Card>
    </div>
  );
}

function UsefulResources() {
  return (
    <div className="max-w-xl">
      <Card>
        <div className={underlineClassName}>
          <h2 className="text-2xl font-bold">Useful Resources</h2>
        </div>
        <ul className="space-y-2 text-xl">
          {usefulResources.map((resource) => (
            <li key={resource.url}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {resource.name}
              </a>
              {" - "}
              <span className="text-lg">{resource.description}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
