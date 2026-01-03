import Navbar from "./_components/Navbar";
import { CLASSES } from "src/classes";
import { FaDiscord } from "react-icons/fa";
import { FaBattleNet } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const rolesNeeded = ["mage", "rogue", "deathknight"] as const;
const warcraftlogspage =
  "https://www.warcraftlogs.com/guild/us/malganis/raise%20your%20eyes";
const raideriopage = "https://raider.io/guilds/us/malganis/Raise%20Your%20Eyes";

export default async function Home() {
  return (
    <div>
      <Navbar />
      <AboutSection />
      <RaidSchedule />
      <Card>raid progress (WIP)</Card>
      <RolesSection />
      <Contact />
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6">
      <div className="mx-auto my-6 max-w-xl rounded-lg bg-gray-700 p-6">
        {children}
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div>
      <Card>
        <div>
          <h2 className="text-xl font-semibold">About Us</h2>
          <h3 className="text-md">
            Welcome to Raise Your Eyes, a Cutting Edge raiding guild on
            Mal'Ganis – US. Our guild was created with the intention of
            providing exceptional players, many of which are returning to WoW
            after years away, an avenue through which to advance their abilities
            while progressing through Heroic/Mythic raids. We offer a
            semi-hardcore environment which means while we do check parses and
            evaluate raider performance we value player improvement over raw
            numbers. Raise Your Eyes is a guild where all voices can be heard.
            We have no “core officer group” of IRL friends who have played
            together for 10 years, instead, we have come together as a group
            where every raider can voice their opinion.
            <h2 className="mt-6 text-xl font-semibold">Links</h2>
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
          <h2 className="text-xl font-semibold">Raid Schedule</h2>
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
        <h2 className="text-xl font-semibold">Roles Needed</h2>
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
      </Card>
    </div>
  );
}

function Contact() {
  return (
    <Card>
      <h2 className="text-xl font-semibold">Contact</h2>
      <div className="mt-3 flex items-center gap-2">
        <FaDiscord size={24} />
        <span>Discord: dwarf1</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <FaBattleNet size={24} />
        <span>BattleNet:Matt#15352</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <FaUser size={24} />
        <span>Ytu-Mal'Ganis</span>
      </div>
    </Card>
  );
}
