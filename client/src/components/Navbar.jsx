import React, { useContext } from "react";

import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow py-4 z-50">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <div
            
            className="cursor-pointer font-bold tracking-wide 
                 text-2xl sm:text-3xl flex items-center gap-1 
                 transition-all duration-300 hover:scale-105"
          >
            <span className="text-black drop-shadow-sm hover:text-gray-700 transition-colors duration-300">
              JOB
            </span>
            <span className="text-sky-500 hover:text-sky-400 transition-colors duration-300">
              DOCK
            </span>
          </div>

        {user ? (
          <div className="flex items-center gap-3">
            <Link to={"/applications"} className="hover:text-[#0EA5E9]">
              Applied Jobs
            </Link>
            <p>|</p>
            <p className="max-sm:hidden">
              Hi, {user.firstName + " " + user.lastName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-600 hover:text-[#0EA5E9]"
            >
              Recruiter Login
            </button>
            <button
              onClick={openSignIn}
              className="bg-[#0EA5E9] text-black  px-6 sm:px-9 py-2 rounded-full hover:bg-sky-500 transition"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
