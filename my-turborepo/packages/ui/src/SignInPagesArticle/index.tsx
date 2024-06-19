import React, {JSX} from "react";
import { CounterButton } from "../LoginRegisterButton";
import { Link } from "../Link";
import { Fragment } from "react";
import "./styles.css";

export function ArticleComponent({
     title,
     fields,
     onClick,
     isLoginComponent,
     buttonPhrase,
     articleUnderPhrase,
     hrefTo
}: {
    title: string;
    fields: JSX.Element[];
    onClick: () => void;
    buttonPhrase: string,
    isLoginComponent: boolean,
    articleUnderPhrase: string,
    hrefTo: string
}): JSX.Element {
    return (
        <div className="article-container">
            <h1 className="title">{title}</h1>
            <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {fields.map((field, index) => (
                    <Fragment key={index}>
                        {field}
                        <br />
                    </Fragment>
                ))}
                <div style={{ marginTop: "30px" }}>
                    <CounterButton onClick={onClick} isLoginComponent={isLoginComponent} buttonPhrase={buttonPhrase}/>
                </div>
            </form>
            <div>
                <p>
                    <Link children={articleUnderPhrase} href={hrefTo}/>
                </p>
            </div>
                {isLoginComponent ? <Link children={"Don't have an account?"} href={"/register"}></Link> : null}
        </div>
    );
}
