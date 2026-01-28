// @ts-nocheck
import Navbar from "./_components/Navbar";
import { CLASSES } from "src/classes";
import { FaDiscord } from "react-icons/fa";
import { FaBattleNet } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Card from "./_components/Card";
import { warcraftlogsFetch } from "../lib/warcraftlogs api/warcraftlogsfetch";

const rolesNeeded = ["mage", "rogue", "deathknight", "druid"];
const warcraftlogspage =
  "https://www.warcraftlogs.com/guild/us/malganis/raise%20your%20eyes";
const raideriopage = "https://raider.io/guilds/us/malganis/Raise%20Your%20Eyes";

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
      <div>
        <Contact />
      </div>
    </div>
  );
}
// <div className="grid items-stretch gap-3 md:grid-cols-2 md:grid-rows-[1fr_auto]">

function AboutSection() {
  return (
    <div>
      <Card>
        <div>
          <h2 className="text-center text-2xl font-bold">About Us</h2>
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
          <h2 className="mb-1 text-2xl font-bold">Raid Schedule</h2>
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
        <h2 className="text-2xl font-bold">Roles Needed</h2>
        <div className="mt-2 space-y-3">
          {rolesNeeded.map((role) => {
            const cls = CLASSES[role];

            return (
              <div key={role} className="flex items-center gap-3">
                <img src={cls.icon} alt={cls.name} className="h-8 w-8" />
                <span>{cls.name}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          All exceptional dps and healers will be considered
        </div>
      </Card>
    </div>
  );
}

function Contact() {
  return (
    <div className="mb-2 max-w-xl">
      <Card id="contact">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Contact</h2>
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

async function RaidProgress() {
  const worldRankQuery = `query {
    guildData {
      guild(name: "Raise Your Eyes", serverSlug: "malganis", serverRegion: "US"){
          zoneRanking(zoneId:44){
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

  return (
    <Card>
      <h2 className="mb-1 text-center text-2xl font-bold">Raid Progress</h2>
      <div className="grid gap-3 text-center md:grid-cols-3">
        <div>
          <h2 className="font-semibold">Current guild rank (world)</h2>
          <h3 className="text-xl font-bold"> {worldRank}</h3>
        </div>
        <div>
          <h2 className="font-semibold">Current guild rank (server)</h2>
          <h3 className="text-xl font-bold"> {serverRank}</h3>
        </div>
        <div>
          <h2 className="font-semibold">Current boss progress</h2>
          <h3 className="text-xl font-bold">(working on API call)</h3>
        </div>
      </div>
    </Card>
  );
}

function LinksSection() {
  return (
    <Card>
      <h2 className="mb-1 text-2xl font-bold">Links</h2>
      <div>
        <a
          href={warcraftlogspage}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-blue-400 hover:underline"
        >
          Warcraft Logs
        </a>
      </div>
      <div>
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
