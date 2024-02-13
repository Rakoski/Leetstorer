import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GC_AUTH_TOKEN, GC_USER_ID } from "../../constants.ts";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <h2>Dashboard</h2>
    );
}

export default Dashboard;
