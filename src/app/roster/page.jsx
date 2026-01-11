// @ts-nocheck
import Card from "../_components/Card";
import { CLASS_BY_ID } from "src/classes";

const BNET_ID = process.env.BLIZZARD_CLIENT_ID;
const BNET_SECRET = process.env.BLIZZARD_CLIENT_SECRET;
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

  return (
    <div className="mx-auto mt-6 max-w-6xl space-y-6 px-6">
      <Card>
        <h3 className="text-xl font-bold">Mythic Roster ({rosterCount})</h3>
        <li className="grid grid-cols-[30px_0.5fr_0.5fr_160px] items-center gap-3 py-2 text-lg">
          <div>Name</div>
          <div></div>
          <div>Class</div>
          <div>Warcraftlogs URL</div>
        </li>
        <ul>
          {sortedRoster.map((member) => {
            const classId = member.character.playable_class.id;
            const wowClass = CLASS_BY_ID[classId];
            const logsURL = `${warcraftlogsURL}/${member.character.realm.slug}/${encodeURIComponent(member.character.name)}`;
            const playerURL = `${characterAPIPrefix}${member.character.realm.slug}/${encodeURIComponent(member.character.name.toLowerCase())}${characterAPISuffix}`;
            // const characterData = getCharacter(playerURL);
            return (
              <li
                className="grid grid-cols-[30px_0.5fr_0.5fr_160px] items-center gap-3 py-2"
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

//base API fetch function
async function getAPI(apiURL) {
  const accessToken = await fetchToken();
  const myHeaders2 = new Headers();
  myHeaders2.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions2 = {
    method: "GET",
    headers: myHeaders2,
    redirect: "follow",
  };

  const apiFetchPromise = await fetch(apiURL, requestOptions2);
  const apiFetchJSON = await apiFetchPromise.json();
  return apiFetchJSON;
}

//pull guild API function
async function showRoster() {
  const rosterFetch = await getAPI(guildAPI);

  const filteredMembers = rosterFetch.members.filter((member) => {
    return member.rank <= 2;
  });

  return filteredMembers;
}

async function getCharacter(characterURL) {
  const characterFetch = await getAPI(characterURL);
  console.log(characterFetch);
  return characterFetch;
  // https://us.api.blizzard.com/profile/wow/character/area-52/Monkurial?namespace=profile-us
  // https://us.api.blizzard.com/profile/wow/character/area-52/monkurial?namespace=profile-us
  // /profile/wow/character/{realmSlug}/{characterName}?namespace=profile-us&locale=en_US
}

//Oauth token request
async function fetchToken() {
  const myHeaders = new Headers();
  const credentials = Buffer.from(`${BNET_ID}:${BNET_SECRET}`).toString(
    "base64",
  );
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

  if (!response.ok) {
    const text = await response.text();
    console.log("Token error body:", text);
    throw new Error(`Token request failed: ${response.status}`);
  }
  const json = await response.json();
  console.log("Token keys:", Object.keys(json));
  const accessToken = json.access_token;

  return accessToken;
}
