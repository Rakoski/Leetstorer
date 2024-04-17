import React from "react";
import { Link } from "react-router-dom";
import "./styles.css"

function Header({onLogout}) {

    return (
        <header>
            <div className="container">
                <h1>Leetstorer</h1>
                <nav>
                    <ul className="nav-links">
                        <li>
                            <Link to="/dashboard">View My Problems</Link>
                        </li>
                        <li>
                            <Link to="/add">Add New Problem</Link>
                        </li>
                        <li>
                            <Link onClick={onLogout} >Leave</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
