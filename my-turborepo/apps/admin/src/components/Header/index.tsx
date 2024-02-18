import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GC_AUTH_TOKEN, GC_USER_ID } from "../../constants.ts";
import Header from "@repo/ui/src/Header";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <h2>Dashboard</h2>
        </>
    );
}

export default Dashboard;
