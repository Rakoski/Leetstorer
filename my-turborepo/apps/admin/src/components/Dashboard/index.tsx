import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@repo/ui/src/Header";
import "./styles.css";
import GetUserProblemsMutation from "../../mutations/GetUserProblemsMutation.ts";

function Dashboard() {
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);
    const userId = localStorage.getItem("GC_USER_ID");

    const getUserProblems = () => {
        GetUserProblemsMutation(userId, (response) => {
            setProblems(response);
        }, (error) => {
            console.log("Error: ", error);
        });
    };

    useEffect(() => {
        getUserProblems();
    }, []);

    return (
        <>
            <Header />
            <div className="problem-list">
                {problems.map((problem, index) => (
                    <div
                        key={index}
                        className="problem-item"
                        onClick={() => navigate(problem.link)}
                    >
                        <h3 className="problem-title">{problem.title}</h3>
                        <p className="problem-description">{problem.description}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Dashboard;
