import React from "react";
import TiptapEditor from "../components/TipTapEditor";
import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div className="card">
            <br></br>
            <br></br>
            <TiptapEditor />
            <Link to="/dashboard">
                <button>Dashboard</button>
            </Link>
            <br></br>
            <br></br>
        </div>
    );
};

export default Welcome;
