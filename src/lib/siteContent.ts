export const ROUTE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/roster", label: "Roster" },
  { href: "/apply", label: "Apply" },
  { href: "/Clips", label: "RYE Clips" },
] as const;

export const GUILD_LINKS = [
  {
    label: "Warcraft Logs",
    href: "https://www.warcraftlogs.com/guild/us/malganis/raise%20your%20eyes",
  },
  {
    label: "raider.io",
    href: "https://raider.io/guilds/us/malganis/Raise%20Your%20Eyes",
  },
] as const;

export const RAID_SCHEDULE = [
  {
    day: "Tuesday",
    time: "9:00pm-12:00am EST",
  },
  {
    day: "Thursday",
    time: "9:00pm-12:00am EST",
  },
] as const;

export const USEFUL_RESOURCES = [
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
] as const;

export const CONTACT_METHODS = [
  { label: "Discord", value: "dwarf1" },
  { label: "Battle.net", value: "Matt#15352" },
  { label: "Main", value: "Ytu-Mal'Ganis" },
] as const;

export const ABOUT_COPY = `Welcome to Raise Your Eyes, a Cutting Edge raiding guild on
Mal'Ganis – US. Our guild was created with the intention of
providing exceptional players, many of which are returning to WoW
after years away, an avenue through which to advance their abilities
while progressing through Heroic/Mythic raids. We offer a
semi-hardcore environment which means while we do check parses and
evaluate raider performance we value player improvement over raw
numbers. Raise Your Eyes is a guild where all voices can be heard.
We have no “core officer group” of IRL friends who have played
together for 10 years, instead, we have come together as a group
where every raider can voice their opinion.`;
