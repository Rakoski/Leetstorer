import { CounterButton, Link } from "@repo/ui";

export default function Index(): JSX.Element {
  function handleOnClick () {
      console.log("Button clicked")
    }

  return (
    <div className="container">
      <h1 className="title">
        Blog <br />
        <span>Kitchen Sink</span>
      </h1>
      <CounterButton onClick={handleOnClick}/>
      <p className="description">
        Built With <Link href="https://turbo.build/repo">Turborepo</Link>
        {" & "}
        <Link href="https://remix.run/">Remix</Link>
      </p>
    </div>
  );
}
