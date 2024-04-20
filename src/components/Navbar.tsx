import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full h-[90px] bg-black px-[20px] md:px-[40px] lg:px-[60px] flex items-center justify-between border-b-2 border-gray-50">
      <h1 className="text-white text-[30px]">Logo</h1>
      <ul className="flex gap-5">
        <li>
          <Link href={"/login"} className="text-white text-[16px]">
            Login
          </Link>
        </li>
        <li>
          <Link href={"/signup"} className="text-white text-[16px]">
            Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
