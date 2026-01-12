import Card from "src/app/_components/Card.jsx";

export default async function Home() {
  return (
    <div className="mx-auto mt-6 max-w-6xl space-y-6 px-6">
      <Card>
        <iframe
          src="https://player.twitch.tv/?channel=imaqtpie&parent=raise-your-eyes.vercel.app&parent=localhost"
          height="480"
          width="850"
          allowFullScreen
        />
      </Card>
    </div>
  );
}
