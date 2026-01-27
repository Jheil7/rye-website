import Card from "src/app/_components/Card.jsx";

export default async function Home() {
  return (
    <div className="mx-auto mt-6 max-w-6xl space-y-6 px-6">
      <Card>
        <div className="aspect-video w-full">
          <iframe
            loading="lazy"
            src="https://www.youtube.com/embed/RYNW3BaOmYQ"
            className="h-full w-full"
            allow="encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Card>
    </div>
  );
}
