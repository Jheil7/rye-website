// @ts-nocheck
import { FaBattleNet, FaDiscord, FaUser } from "react-icons/fa";
import { CLASSES } from "src/classes";
import Card from "./_components/Card";
import { GuildHero } from "./_components/site/GuildHero";
import { Reveal } from "./_components/site/Reveal";
import {
  ABOUT_COPY,
  CONTACT_METHODS,
  GUILD_LINKS,
  RAID_SCHEDULE,
  USEFUL_RESOURCES,
} from "~/lib/siteContent";
import { warcraftlogsFetch } from "../lib/warcraftlogs api/warcraftlogsfetch";
import { raiderIOData } from "./raiderio/raideriofetch";
import {
  getPreviousRaidRankSnapshot,
  getRankChange,
} from "~/lib/raidRankHistory";

const zoneID = 46;
const rolesNeeded = [];

export default async function Home() {
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

  const [guildRankFetch, highestBoss, previousSnapshot] = await Promise.all([
    warcraftlogsFetch(worldRankQuery),
    fetchHighestBossProgress(),
    getPreviousRaidRankSnapshot("midnight_s1"),
  ]);

  const worldRank =
    guildRankFetch?.data?.guildData?.guild?.zoneRanking?.progress?.worldRank
      ?.number ?? null;
  const serverRank =
    guildRankFetch?.data?.guildData?.guild?.zoneRanking?.progress?.serverRank
      ?.number ?? null;

  const worldRankChange = getRankChange(
    worldRank,
    previousSnapshot?.worldRank ?? null,
  );
  const serverRankChange = getRankChange(
    serverRank,
    previousSnapshot?.serverRank ?? null,
  );

  return (
    <div className="pb-24">
      <GuildHero subtitle="Mal'Ganis – US" />

      <div className="mx-auto max-w-6xl space-y-6 px-6">
        <Reveal>
          <Card>
            <div className="mb-4 border-b border-white/10 pb-3">
              <h2 className="font-cinzel text-center text-3xl font-bold text-[#f0e9fb]">
                About Us
              </h2>
            </div>
            <p className="arcane-copy text-base sm:text-lg">{ABOUT_COPY}</p>
          </Card>
        </Reveal>

        <div className="grid items-stretch gap-4 md:grid-cols-[1fr_2fr] md:grid-rows-2">
          <Reveal>
            <Card>
              <div className="mb-4 border-b border-white/10 pb-3">
                <h2 className="font-cinzel text-3xl font-bold text-[#f0e9fb]">
                  Raid Schedule
                </h2>
              </div>
              <div className="space-y-2">
                {RAID_SCHEDULE.map((entry) => (
                  <div
                    key={entry.day}
                    className="font-spectral text-lg text-[#efe8fa]"
                  >
                    {entry.day} {entry.time}
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal className="md:row-span-2">
            <div className="arcane-panel relative h-full overflow-hidden p-0">
              <img
                src="/CE.png"
                alt="Cutting Edge Photo"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal>
            <Card>
              <div className="mb-4 border-b border-white/10 pb-3">
                <h2 className="font-cinzel text-3xl font-bold text-[#f0e9fb]">
                  Links
                </h2>
              </div>
              <div className="space-y-3 text-xl">
                {GUILD_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block break-all text-[#8dc8ff] hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>

        <Reveal>
          <Card>
            <div className="mb-4 border-b border-white/10 pb-3">
              <h2 className="font-cinzel text-center text-3xl font-bold text-[#f0e9fb]">
                Raid Progress
              </h2>
            </div>

            <div className="grid gap-4 text-center md:grid-cols-3">
              <ProgressCard
                title="Current guild rank (world)"
                value={formatRank(worldRank)}
                status={formatRankChange(worldRankChange)}
              />
              <ProgressCard
                title="Current guild rank (server)"
                value={formatRank(serverRank)}
                status={formatRankChange(serverRankChange)}
              />
              <BossProgressCard boss={highestBoss} />
            </div>
          </Card>
        </Reveal>

        <div className="grid items-stretch gap-4 md:grid-cols-[2fr_1fr]">
          <Reveal>
            <div className="arcane-panel relative h-full overflow-hidden p-0">
              <img
                src="/Dimensius.png"
                alt="Dimensius"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal>
            <Card>
              <div className="mb-4 border-b border-white/10 pb-3">
                <h2 className="font-cinzel text-3xl font-bold text-[#f0e9fb]">
                  Roles Needed
                </h2>
              </div>
              <div className="space-y-3">
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
                      <span className="text-base text-[#efe8fa]">
                        {spec ? `${spec.name} ${cls.name}` : cls.name}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-base text-[#efe8fa]">
                Currently accepting all experienced raiders. Ranged dps are
                currently the top priority.
              </div>
            </Card>
          </Reveal>
        </div>

        <div className="grid items-stretch gap-4 md:grid-cols-[1fr_1fr]">
          <Reveal>
            <Card id="contact">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-4 border-b border-white/10 pb-3">
                    <h2 className="font-cinzel text-3xl font-bold text-[#f0e9fb]">
                      Contact
                    </h2>
                  </div>
                  <p className="mb-4 text-sm text-[#b3a8c6]">
                    Reach out to our GM
                  </p>

                  <div className="space-y-3">
                    <ContactRow
                      icon={<FaDiscord size={22} className="opacity-80" />}
                      label={CONTACT_METHODS[0]?.label}
                      value={CONTACT_METHODS[0]?.value}
                    />
                    <ContactRow
                      icon={<FaBattleNet size={22} className="opacity-80" />}
                      label={CONTACT_METHODS[1]?.label}
                      value={CONTACT_METHODS[1]?.value}
                    />
                    <ContactRow
                      icon={<FaUser size={22} className="opacity-80" />}
                      label={CONTACT_METHODS[2]?.label}
                      value={CONTACT_METHODS[2]?.value}
                    />
                  </div>
                </div>

                <img
                  src="/Matt.png"
                  alt="picture of GM"
                  className="h-48 w-48 rounded-[18px] border border-white/8 object-cover"
                />
              </div>
            </Card>
          </Reveal>

          <Reveal>
            <Card>
              <div className="mb-4 border-b border-white/10 pb-3">
                <h2 className="font-cinzel text-3xl font-bold text-[#f0e9fb]">
                  Useful Resources
                </h2>
              </div>
              <ul className="space-y-3 text-lg">
                {USEFUL_RESOURCES.map((resource) => (
                  <li key={resource.url}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8dc8ff] hover:underline"
                    >
                      {resource.name}
                    </a>
                    {" - "}
                    <span className="text-base text-[#efe8fa]">
                      {resource.description}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function ProgressCard({ title, value, status }) {
  const tone =
    status.kind === "up"
      ? "text-green-400"
      : status.kind === "down"
        ? "text-red-400"
        : "text-slate-300";

  const background =
    status.kind === "up"
      ? "border-green-500/40 bg-green-500/15"
      : status.kind === "down"
        ? "border-red-500/40 bg-red-500/15"
        : "border-slate-500/40 bg-slate-500/10";

  return (
    <Card className="border-slate-500/50 bg-white/4 py-5">
      <h2 className="text-sm font-semibold text-slate-200">{title}</h2>

      <div className="mt-3 flex flex-1 items-center justify-center">
        <p className="font-cinzel text-4xl leading-tight font-bold text-[#f0e9fb]">
          {value}
        </p>
      </div>

      <div
        className={`mt-3 rounded-full border py-1 text-center text-sm font-semibold ${background} ${tone}`}
      >
        {status.label}
      </div>
    </Card>
  );
}

function BossProgressCard({ boss }) {
  const highestBossName = boss.bossName;
  const highestBossPercentage = boss.bossPercentage;
  const difficultyAbbreviations = {
    normal: "N",
    heroic: "H",
    mythic: "M",
  };
  const highestBossDifficulty =
    difficultyAbbreviations[boss.difficulty?.toLowerCase()] ??
    boss.difficulty ??
    "";

  return (
    <Card className="border-slate-500/50 bg-white/4 py-5">
      <h2 className="text-sm font-semibold text-slate-200">
        Current boss progress
      </h2>

      <div className="mt-3 flex flex-1 flex-col justify-center">
        <p className="font-cinzel text-2xl leading-tight font-bold text-[#f0e9fb]">
          {highestBossDifficulty} {highestBossName}
        </p>

        <p
          className={`mt-2 text-lg font-semibold ${
            highestBossPercentage === 0 ? "text-green-400" : "text-slate-100"
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
  );
}

function ContactRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-[#efe8fa]">
      {icon}
      <span>
        <span className="text-[#b3a8c6]">{label}:</span> {value}
      </span>
    </div>
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

function formatRank(value) {
  return typeof value === "number" ? `#${value}` : "—";
}

function formatRankChange(change) {
  if (!change) {
    return {
      kind: "same",
      label: "No previous data",
    };
  }

  if (change.direction === "up") {
    return {
      kind: "up",
      label: `↓ ${change.amount} from last week`,
    };
  }

  if (change.direction === "down") {
    return {
      kind: "down",
      label: `↑ ${change.amount} from last week`,
    };
  }

  return {
    kind: "same",
    label: "No change from last week",
  };
}
