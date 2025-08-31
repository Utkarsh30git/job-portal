import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20">
      <div
        className="cursor-pointer font-bold tracking-wide 
             text-2xl sm:text-3xl flex items-center gap-1"
      >
        <span className="text-black drop-shadow-sm">JOB</span>
        <span className="text-sky-500">DOCK</span>
      </div>
      <p className="flex-1  pl-4 text-sm text-gray-500 max-sm:hidden">
        Copyright | All rights reserved.
      </p>
      <div className="flex gap-2.5">
        <img width={38} src={assets.instagram_icon} alt="" />
        <img width={38} src={assets.facebook_icon} alt="" />
        <img width={38} src={assets.twitter_icon} alt="" />
      </div>
    </div>
  );
};

export default Footer;
