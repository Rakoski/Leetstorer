import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="container">
                <h1>Leetstorer</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/view">View My Problems</Link>
                        </li>
                        <li>
                            <Link to="/add">Add a Problem</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
