"use client";

import { useState } from "react";
import Card from "../_components/Card";

export default function ApplyPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // "idle" | "ok" | "err"
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    const formEl = e.currentTarget; // capture it right away
    const form = new FormData(formEl);

    setLoading(true);
    setStatus("idle");
    setError("");

    const body = {
      name: form.get("name"),
      realm: form.get("realm"),
      logs: form.get("logs"),
      notes: form.get("notes"),
    };

    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      setStatus("ok");
      formEl.reset(); // use captured reference
    } else {
      setStatus("err");
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Something went wrong.");
    }
  }

  const row = "grid gap-2 md:grid-cols-[220px_1fr] md:items-center";
  const label = "text-sm font-medium text-slate-200";
  const input =
    "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400";
  const textarea = input + " min-h-[120px] resize-y";

  return (
    <div className="mx-auto mt-6 max-w-3xl px-6">
      <Card>
        <h2 className="text-xl font-semibold">Apply</h2>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div className={row}>
            <label className={label} htmlFor="name">
              Character Name
            </label>
            <input
              id="name"
              name="name"
              className={input}
              placeholder="e.g. Arthas"
            />
          </div>

          <div className={row}>
            <label className={label} htmlFor="realm">
              Character Realm
            </label>
            <input
              id="realm"
              name="realm"
              className={input}
              placeholder="e.g. Area-52"
            />
          </div>

          <div className={row}>
            <label className={label} htmlFor="logs">
              Warcraft Logs Link
            </label>
            <input
              id="logs"
              name="logs"
              className={input}
              placeholder="https://www.warcraftlogs.com/character/..."
            />
          </div>

          <div className="grid gap-2 md:grid-cols-[220px_1fr]">
            <label className={label} htmlFor="notes">
              Anything you want to say
            </label>
            <textarea
              id="notes"
              name="notes"
              className={textarea}
              placeholder="Schedule, experience, goals, questions..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            {status === "ok" && (
              <span className="text-sm text-green-400">Submitted!</span>
            )}
            {status === "err" && (
              <span className="text-sm text-red-400">{error}</span>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-400 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
