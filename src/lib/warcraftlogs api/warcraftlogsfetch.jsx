// @ts-nocheck
const WARCRAFTLOGS_ID = process.env.WARCRAFTLOGS_CLIENT_ID;
const WARCRAFTLOGS_SECRET = process.env.WARCRAFTLOGS_CLIENT_SECRET;

export async function warcraftlogsFetch(query) {
  const accessToken = await fetchTokenWCL();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const graphql = JSON.stringify({
    query,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  const apiFetchJSON = await fetch(
    "https://www.warcraftlogs.com/api/v2/client/",
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.error(error));

  return apiFetchJSON;
}

async function fetchTokenWCL() {
  const myHeaders = new Headers();
  const credentials = Buffer.from(
    `${WARCRAFTLOGS_ID}:${WARCRAFTLOGS_SECRET}`,
  ).toString("base64");
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
    "https://www.warcraftlogs.com/oauth/token",
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
