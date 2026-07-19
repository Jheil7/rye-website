import Card from "../_components/Card";
import Switch from "../_components/Switch";
import { Reveal } from "../_components/site/Reveal";

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-6 pb-24 sm:pt-8">
      <Reveal>
        <Card>
          <Switch />
        </Card>
      </Reveal>
    </div>
  );
}
