import React from "react";
import { CounterButton } from "../CounterButton";
import { Link } from "../Link";
import { Fragment } from "react";
import "./index.css";

export function ArticleComponent({
     title,
     fields,
     onSubmit,
     isLoginComponent
}: {
    title: string;
    fields: JSX.Element[];
    onSubmit: () => void;
    isLoginComponent: boolean
}): JSX.Element {
    return (
        <div className="article-container">
            <h1 className="title">{title}</h1>
            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {fields.map((field, index) => (
                    <Fragment key={index}>
                        {field}
                        <br />
                    </Fragment>
                ))}
                <div style={{ marginTop: "30px" }}>
                    <CounterButton />
                </div>
            </form>
            <p className="description">
                Built With{" "}
                <Link href="https://turbo.build/repo" newTab>
                    Turborepo
                </Link>
            </p>
            {(isLoginComponent ?
                <div>
                    <Link children="Sign up!"  href={"/register"}/>
                </div>
                    :
                <div>
                    <Link children="Already a member?"  href={"/login"}/>
                </div>)}
        </div>
    );
}
