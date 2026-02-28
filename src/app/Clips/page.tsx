import Card from "src/app/_components/Card";
import YoutubeEmbed from "src/app/_components/YoutubeEmbed";

export default function Home() {
  return (
    <div className="mx-auto mt-6 mb-10 max-w-6xl space-y-6 px-6">
      {/* Mugzee Moment */}
      <Card>
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
