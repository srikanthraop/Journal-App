import React from "react";
import TiptapEditor from "../components/TipTapEditor";
import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div className="card">
            <h1>Welcome</h1>
            <Link to="/dashboard">
                <button>Dashboard</button>
            </Link>
        </div>
    );
};

export default Welcome;
