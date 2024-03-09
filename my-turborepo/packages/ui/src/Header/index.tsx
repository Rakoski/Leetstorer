import React from "react";
import { Link } from "react-router-dom";
import "./styles.css"

function Header() {
    return (
        <header>
            <div className="container">
                <h1>Leetstorer</h1>
                <nav>
                    <ul className="nav-links">
                        <li>
                            <Link to="/Dashboard">View My Problems</Link>
                        </li>
                        <li>
                            <Link to="/add">Add New Problem</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
