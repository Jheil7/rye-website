import Card from "../_components/Card";
import { CLASS_BY_ID } from "src/classes";

const BNET_ID = process.env.BLIZZARD_CLIENT_ID;
const BNET_SECRET = process.env.BLIZZARD_CLIENT_SECRET;

export default async function App() {
  const roster = await showRoster();
  const rosterCount = roster.length;

  const sortedRoster = [...roster].sort((a, b) =>
    a.character.name.localeCompare(b.character.name),
  );

  return (
    <Card>
      <h3 className="text-xl font-bold">Mythic Roster ({rosterCount})</h3>
      <ul>
        {sortedRoster.map((member) => {
          const classId = member.character.playable_class.id;
          const wowClass = CLASS_BY_ID[classId];

          return (
            <li
              className="mt-3 flex items-center gap-3"
              key={member.character.id}
            >
              <img
                src={wowClass.icon}
                alt={wowClass.name}
                className="h-8 w-8 rounded"
              />
              <span>{member.character.name}</span>
              <span className="ml-2 text-sm opacity-70">
                {" "}
                {wowClass ? wowClass.name : `Class ${classId}`}{" "}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

async function showRoster() {
  const accessToken = await fetchToken();
  const myHeaders2 = new Headers();
  myHeaders2.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions2 = {
    method: "GET",
    headers: myHeaders2,
    redirect: "follow",
  };

  const rosterFetch = await fetch(
    "https://us.api.blizzard.com/data/wow/guild/malganis/raise-your-eyes/roster?namespace=profile-us&locale=en_US",
    requestOptions2,
  );
  const rosterJson = await rosterFetch.json();
  const filteredMembers = rosterJson.members.filter((member) => {
    return member.rank <= 2;
  });

  return filteredMembers;
}

async function fetchToken() {
  const myHeaders = new Headers();
  const BNET_ID = "2d7af39a1d4e4e3380864980153c4298";
  const BNET_SECRET = "2TRHK75anPYIlBnn1yomCd2KBffcXicM";
  const credentials = Buffer.from(`${BNET_ID}:${BNET_SECRET}`).toString(
    "base64",
  );
  console.log(credentials);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${credentials}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const response = await fetch(
    "https://oauth.battle.net/token",
    requestOptions,
  );
  const json = await response.json();
  const accessToken = json.access_token;

  return accessToken;
}
