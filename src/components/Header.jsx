import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b-1 sticky top-0 z-50 flex h-14 flex-col items-center justify-center overscroll-none bg-neutral-900 drop-shadow-xl">
      <span className="font-mono text-xl tracking-tighter text-neutral-100">
        <Link to="/dashboard"> Srikanth's Journal</Link>
      </span>
    </header>
  );
};

export default Header;
