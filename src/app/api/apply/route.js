// @ts-nocheck
import { NextResponse } from "next/server";

function clean(s) {
  return typeof s === "string" ? s.trim() : "";
}

export async function POST(req) {
  try {
    const body = await req.json();
    const characterName = clean(body.name);
    const characterRealm = clean(body.realm);
    const logsLink = clean(body.logs);
    const message = clean(body.notes);

    if (!characterName || !characterRealm) {
      return NextResponse.json(
        { error: "Name and realm are required." },
        { status: 400 },
      );
    }

    const webhook = process.env.DISCORDWEBHOOK;
    if (!webhook) {
      return NextResponse.json(
        { error: "Webhook not configured." },
        { status: 500 },
      );
    }

    const payload = {
      content: "New guild application:",
      embeds: [
        {
          title: `${characterName} - ${characterRealm}`,
          fields: [
            {
              name: "Character",
              value: `${characterName} - ${characterRealm}`,
              inline: true,
            },
            { name: "Warcraft Logs", value: logsLink || "—", inline: false },
            { name: "Message", value: message || "—", inline: false },
          ],
        },
      ],
      allowed_mentions: { parse: [] },
    };

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Discord webhook failed.", details: text },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
