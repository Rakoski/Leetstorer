import { log } from "@repo/logger";
import CounterButton from "@repo/ui/src/CounterButton";
import Link from "next/link";

export const metadata = {
  title: "Store | Kitchen Sink",
};

export default function Store(): JSX.Element {
  log("Hey! This is the Store page.");

  return (
    <div className="container">
      <h1 className="title">
        Store <br />
        <span>Kitchen Sink</span>
      </h1>
      <p className="description">
        Built With{" "}
        {" & "}
      </p>
    </div>
  );
}
