import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="bg-slate-600">
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
    </div>
  );
};

export default Error;
