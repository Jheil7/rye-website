import Card from "../_components/Card";
import { Reveal } from "../_components/site/Reveal";

export type RosterDirectoryMember = {
  id: number;
  name: string;
  className: string;
  classIcon: string;
  specName: string | null;
  itemLevel: number | null;
  dpsAvg: number | null;
  hpsAvg: number | null;
  raiderIOScore: number | null;
  logsUrl: string;
};

type RosterDirectoryProps = {
  members: RosterDirectoryMember[];
};

function getParseColor(avg: number | null): string {
  if (typeof avg !== "number") return "text-gray-400";
  if (avg >= 95) return "text-orange-400";
  if (avg >= 75) return "text-purple-500";
  if (avg >= 50) return "text-blue-500";
  if (avg >= 25) return "text-green-500";
  return "text-gray-400";
}

export function RosterDirectory({ members }: RosterDirectoryProps) {
  return (
    <Reveal>
      <Card>
        <h3 className="font-cinzel text-xl font-bold text-[#f0e9fb]">
          Mythic Roster ({members.length})
        </h3>

        <div className="mt-6 hidden overflow-x-auto lg:block">
          <table className="w-full border-separate border-spacing-y-3 text-left">
            <thead>
              <tr className="font-rajdhani text-sm font-semibold tracking-[0.18em] text-[#9c90b3] uppercase">
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Current Spec/Class</th>
                <th className="px-3 py-2">Ilvl</th>
                <th className="px-3 py-2">Best Parse Avg. (DPS/Heal)</th>
                <th className="px-3 py-2">M+ Score</th>
                <th className="px-3 py-2">Warcraftlogs URL</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="bg-white/4 align-middle shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                >
                  <td className="rounded-l-2xl px-3 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.classIcon}
                        alt={member.className}
                        className="h-10 w-10 rounded"
                      />
                      <span className="text-lg text-[#efe8fa]">
                        {member.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-lg text-[#b3a8c6]">
                    {member.specName ?? "—"} {member.className}
                  </td>
                  <td className="px-3 py-4 text-lg text-[#efe8fa]">
                    {member.itemLevel ?? "—"}
                  </td>
                  <td className="px-3 py-4 text-lg">
                    <span className={getParseColor(member.dpsAvg)}>
                      {member.dpsAvg?.toFixed(1) ?? "—"}
                    </span>
                    <span className="px-2 text-[#6f6486]">/</span>
                    <span className={getParseColor(member.hpsAvg)}>
                      {member.hpsAvg?.toFixed(1) ?? "—"}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-lg text-[#efe8fa]">
                    {member.raiderIOScore ?? "—"}
                  </td>
                  <td className="rounded-r-2xl px-3 py-4">
                    <a
                      href={member.logsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-[#8dc8ff] hover:underline"
                    >
                      WCL/{member.name}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-4 lg:hidden">
          {members.map((member) => (
            <div
              key={member.id}
              className="rounded-[20px] border border-white/8 bg-white/4 p-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.classIcon}
                  alt={member.className}
                  className="h-10 w-10 rounded"
                />
                <div>
                  <div className="text-lg text-[#efe8fa]">{member.name}</div>
                  <div className="text-sm text-[#b3a8c6]">
                    {member.specName ?? "—"} {member.className}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 text-sm">
                <MobileRow label="Ilvl" value={member.itemLevel ?? "—"} />
                <MobileRow
                  label="Best Parse Avg. (DPS/Heal)"
                  value={`${member.dpsAvg?.toFixed(1) ?? "—"} / ${
                    member.hpsAvg?.toFixed(1) ?? "—"
                  }`}
                />
                <MobileRow
                  label="M+ Score"
                  value={member.raiderIOScore ?? "—"}
                />
                <div>
                  <div className="font-rajdhani text-xs font-semibold tracking-[0.18em] text-[#9c90b3] uppercase">
                    Warcraftlogs URL
                  </div>
                  <a
                    href={member.logsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block break-all text-[#8dc8ff] hover:underline"
                  >
                    WCL/{member.name}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Reveal>
  );
}

function MobileRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="font-rajdhani text-xs font-semibold tracking-[0.18em] text-[#9c90b3] uppercase">
        {label}
      </div>
      <div className="mt-1 text-[#efe8fa]">{value}</div>
    </div>
  );
}
