import React from "react";
import { Link } from "react-router-dom";
import MoodDrawer from "@/components/mood/MoodDrawer";

const Welcome = () => {
  const slides = [0, 1, 2, 3, 4];
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/dashboard">
        <button>Dashboard</button>
      </Link>
    </div>
  );
};

export default Welcome;
