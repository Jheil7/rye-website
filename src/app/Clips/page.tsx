// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Card from "src/app/_components/Card.jsx";
import YoutubeEmbed from "src/app/_components/YoutubeEmbed.jsx";

export default async function Home() {
  return (
    <div className="mx-auto mt-6 mb-10 max-w-6xl space-y-6 px-6">
      {/* Mugzee Moment */}
      <Card className="border border-white">
        <h2 className="mb-3 flex justify-center text-2xl font-bold">
          {"Mug'Zee Compilation"}
        </h2>
        <YoutubeEmbed videoId="RYNW3BaOmYQ" start={0} />
      </Card>

      {/* Phroze */}
      <Card>
        <h2 className="mb-3 flex justify-center text-2xl font-bold">
          {"Phroze's House"}
        </h2>
        <YoutubeEmbed videoId="jm9NtxKLGh4" start={598} />
      </Card>
    </div>
  );
}
