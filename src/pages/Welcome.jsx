import HappyText from "@/text-framer-motion/HappyText";
import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Welcome</h1>
      <div>
        <HappyText text={"Srikanth"} />
      </div>
      <Link to="/dashboard">
        <button>Dashboard</button>
      </Link>
    </div>
  );
};

export default Welcome;
