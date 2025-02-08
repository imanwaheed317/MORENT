"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaBell, FaCog } from "react-icons/fa";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="w-full bg-white h-auto flex flex-col items-center p-4 md:p-6 border-b-2 border-[#e7eef6] shadow-sm">
      {/* Navbar Container */}
      <div className="flex flex-col md:flex-row justify-between w-full items-center gap-6 md:gap-12">
        
        {/* Left Section */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 w-full">
          <h1 className="text-[#3563e9] text-4xl font-bold hover:scale-110 transition-transform">
            MORENT
          </h1>
          <div className="relative w-full">
            <Image
              src={"/search-normal.png"}
              alt="search icon"
              width={22}
              height={22}
              className="absolute top-1/2 left-3 transform -translate-y-1/2"
            />

            <input
              type="text"
              title="search"
              placeholder="Search for cars..."
              className="border-2 border-[#e7eef6] w-full md:w-[420px] h-[42px] rounded-full p-2 pl-10 pr-12 focus:border-[#3563e9] focus:ring-2 focus:ring-[#3563e9] transition"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="icons flex items-center gap-6 mt-4 md:mt-0">
          <Link href="/wishlist">
            <div className="relative hover:scale-110 transition-transform">
              <FaHeart className="text-2xl text-gray-700 hover:text-red-500 transition" />
            </div>
          </Link>
          <div className="icon-container flex items-center gap-6 text-2xl">
            <div className="relative hover:scale-110 transition-transform">
              <FaBell className="hover:text-blue-500 transition" />
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
            </div>
            <FaCog className="hover:text-blue-500 transition hover:rotate-90 duration-500" />
          </div>
          <div className="profile flex items-center">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-[#3563e9] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
}
