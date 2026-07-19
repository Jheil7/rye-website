import Card from "src/app/_components/Card";
import { Reveal } from "../_components/site/Reveal";

export default async function TwitchStreamsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 pt-6 pb-24 sm:pt-8">
      <Reveal>
        <Card>
          <div className="aspect-video w-full overflow-hidden rounded-[18px]">
            <iframe
              src="https://player.twitch.tv/?channel=imaqtpie&autoplay=false&parent=raise-your-eyes.vercel.app&parent=localhost"
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
