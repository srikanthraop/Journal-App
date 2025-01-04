import React from "react";
import { BarLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <BarLoader size={40} color="#565656" />
    </div>
  );
};

export default LoadingScreen;
