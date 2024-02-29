import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Header from "@repo/ui/src/Header";
import "./index.css";

const GET_PROBLEMS = gql`
    query {
        problems {
            title
            description
            level
            frequency
            link
            data_structure
            date
        }
    }
`;

function Dashboard() {
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_PROBLEMS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <Header />
            <div className="problem-list">
                {data.problems.map((problem, index) => (
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
