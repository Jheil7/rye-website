import Card from "src/app/_components/Card";
import YoutubeEmbed from "src/app/_components/YoutubeEmbed";
import { Reveal } from "../_components/site/Reveal";

export default function ClipsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 pt-6 pb-24 sm:pt-8">
      <Reveal>
        <Card>
          <h2 className="font-cinzel mb-3 flex justify-center text-3xl font-bold text-[#f0e9fb]">
            {"Mug'Zee Compilation"}
          </h2>
          <YoutubeEmbed videoId="RYNW3BaOmYQ" start={0} />
        </Card>
      </Reveal>

      <Reveal delay={0.06}>
        <Card>
          <h2 className="font-cinzel mb-3 flex justify-center text-3xl font-bold text-[#f0e9fb]">
            {"Phroze's House"}
          </h2>
          <YoutubeEmbed videoId="jm9NtxKLGh4" start={598} />
        </Card>
      </Reveal>
    </div>
  );
}
