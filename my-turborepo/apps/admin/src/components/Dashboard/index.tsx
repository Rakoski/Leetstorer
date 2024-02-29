import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GC_AUTH_TOKEN, GC_USER_ID } from "../../constants.ts";
import Header from "@repo/ui/src/Header";
import "./index.css"

function Dashboard() {
    const navigate = useNavigate();
    const [problems, setProblems] = useState([
        {
            title: "Two Sum",
            description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
            level: "Easy",
            frequency: "Frequent",
            link: "https://leetcode.com/problems/two-sum/",
            data_structure: "Array",
            date: "2024-02-20"
        },
        {
            title: "Reverse Linked List",
            description: "Reverse a singly linked list.",
            level: "Easy",
            frequency: "Frequent",
            link: "https://leetcode.com/problems/reverse-linked-list/",
            data_structure: "Linked List",
            date: "2024-02-20"
        },
        {
            title: "Two Sum",
            description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
            level: "Easy",
            frequency: "Frequent",
            link: "https://leetcode.com/problems/two-sum/",
            data_structure: "Array",
            date: "2024-02-20"
        },
        {
            title: "Two Sum",
            description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
            level: "Easy",
            frequency: "Frequent",
            link: "https://leetcode.com/problems/two-sum/",
            data_structure: "Array",
            date: "2024-02-20"
        },
        {
            title: "Two Sum",
            description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
            level: "Easy",
            frequency: "Frequent",
            link: "https://leetcode.com/problems/two-sum/",
            data_structure: "Array",
            date: "2024-02-20"
        },
        {
            title: "Two Sum",
            description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
            level: "Easy",
            frequency: "Frequent",
            link: "https://leetcode.com/problems/two-sum/",
            data_structure: "Array",
            date: "2024-02-20"
        },

    ]);

    return (
        <>
            <Header />
            <div className="problem-list">
                {problems.map((problem, index) => (
                    <div key={index} className="problem-item" onClick={() => navigate(problem.link)}>
                        <h3 className="problem-title">{problem.title}</h3>
                        <p className="problem-description">{problem.description}</p>
                    </div>
                ))}

            </div>
        </>
    );
}

export default Dashboard;
