import React from "react";
import { CounterButton } from "../CounterButton";
import { Link } from "../Link";
import { Fragment } from "react";

export function ArticleComponent({
 title,
 fields,
 onSubmit,
}: {
    title: string;
    fields: JSX.Element[];
    onSubmit: () => void;
}): JSX.Element {
    return (
        <div
            className="article-container"
            style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                padding: "20px",
                borderRadius: "8px",
                maxWidth: "380px",
                margin: "auto",
                marginTop: "200px",
            }}
        >
            <h1 className="title">{title}</h1>
            <form onSubmit={onSubmit}>
                {fields.map((field, index) => (
                    <Fragment key={index}>
                        {field}
                        <br />
                    </Fragment>
                ))}
                <CounterButton />
            </form>
            <p className="description">
                Built With{" "}
                <Link href="https://turbo.build/repo" newTab>
                    Turborepo
                </Link>
            </p>
        </div>
    );
}
