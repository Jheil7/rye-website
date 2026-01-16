// @ts-nocheck
const BNET_ID = process.env.BLIZZARD_CLIENT_ID;
const BNET_SECRET = process.env.BLIZZARD_CLIENT_SECRET;

//Oauth token request
export async function fetchToken() {
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

//base blizzard API fetch function
export async function getAPI(apiURL) {
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
