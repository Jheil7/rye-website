// @ts-nocheck

export async function raiderIOData(apiURL) {
  const res = await fetch(apiURL);

  if (!res.ok) {
    const text = await res.text();
    console.error("Raider.IO error:", text);
    throw new Error(`Raider.IO failed: ${res.status}`);
  }
  const json = res.json();
  return json;
}
