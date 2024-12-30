import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntries } from "../features/entrySlice";
import JournalEntryList from "../components/JournalEntryList";

// HANDLE THE ERROR WHEN NO ENTRIES

const Dashboard = () => {
    const dispatch = useDispatch();
    const { entries, status, error } = useSelector((state) => state.entries);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchEntries());
        }
    }, [dispatch, status]);

    return (
        <div className="dashboard">
            {/* Header Section */}
            <header className="dashboard-header">
                <h1>Welcome Back, User!</h1>
                <p>Today's Date: {new Date().toLocaleDateString()}</p>
            </header>

            {/* Quick Actions Section */}
            <section className="dashboard-actions">
                <Link to="/entry/new">
                    <button>Create New Entry</button>
                </Link>
                <Link to="/entries">
                    <button>View All Entries</button>
                </Link>
            </section>

            {/* Recent Entries Section */}

            <section>
                {status === "loading" && <p>Loading entries...</p>}
                {status === "failed" && <p>Error: {error}</p>}
                {status === "succeeded" && entries && (
                    <JournalEntryList entries={entries} />
                )}
            </section>
        </div>
    );
};

export default Dashboard;
