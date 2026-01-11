import Card from "src/app/_components/Card.jsx";

export default async function Home() {
  return (
    <Card>
      <iframe
        src="https://player.twitch.tv/?channel=imaqtpie&parent=raise-your-eyes.vercel.app&parent=localhost"
        height="480"
        width="850"
        allowFullScreen
      />
    </Card>
  );
}
