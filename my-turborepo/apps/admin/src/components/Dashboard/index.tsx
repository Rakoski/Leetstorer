import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Header from "@repo/ui/src/Header";
import "./index.css";

const GET_PROBLEMS = gql`
    query {
        users {
            createdProblems {
                title
                description
                level
                frequency
                link
                data_structure
                date
            }
        }
    }
`;

function Dashboard() {
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        const authToken = localStorage.getItem("GC_AUTH_TOKEN");
        const userId = localStorage.getItem("GC_USER_ID");

        console.log("authtoken e userId: ", authToken, userId)

        if (authToken && userId) {
            fetchProblems(authToken, userId).catch(error => console.log("error: ", error));
        } else {
            console.log("error ao mandar a requisição")
        }
    }, []);

    const fetchProblems = async (authToken, userId) => {
        const { loading, error, data } = await useQuery(GET_PROBLEMS, {
            context: {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "GC-USER-ID": userId,
                },
            },
        });

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;

        // Set the fetched problems to state
        setProblems(data.users[0].createdProblems);
    };

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
