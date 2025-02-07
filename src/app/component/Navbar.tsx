"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaBell, FaCog } from "react-icons/fa";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const carData = [
  { id: 1, name: "Koenigsegg" },
  { id: 2, name: "Rolls-Royce" },
  { id: 3, name: "Nissan Altima" },
  { id: 4, name: "Rolls-Royce" },
  { id: 5, name: "All New Terlos" },
  { id: 6, name: "Nissan GT-R" },
  { id: 7, name: "Tesla Model 3" },
  { id: 8, name: "Ford Mustang" },
  { id: 9, name: "BMW X5" },
  { id: 10, name: "Audi A6" },
  { id: 12, name: "Porsche 911" },
  { id: 13, name: "Chevrolet Camaro" },
  { id: 14, name: "MG ZX Exclusive" },
  { id: 15, name: "CR-V" },
];

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState(carData);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likedCars") || "{}");
    const count = Object.values(savedLikes).filter(Boolean).length;
    setWishlistCount(count);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = carData.filter((car) =>
      car.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCars(results);
  };

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
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="border-2 border-[#e7eef6] w-full md:w-[420px] h-[42px] rounded-full p-2 pl-10 pr-12 focus:border-[#3563e9] focus:ring-2 focus:ring-[#3563e9] transition"
            />
           
          </div>
        </div>

        {/* Right Section */}
        <div className="icons flex items-center gap-6 mt-4 md:mt-0">
          <Link href="/wishlist">
            <div className="relative hover:scale-110 transition-transform">
              <FaHeart className="text-2xl text-gray-700 hover:text-red-500 transition" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                  {wishlistCount}
                </span>
              )}
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

      {/* Search Results */}
      {searchQuery && (
        <div className="absolute top-[80px] md:top-[100px] bg-white shadow-lg rounded-md p-4 w-full md:w-[420px] max-h-[200px] overflow-y-auto border border-gray-200">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <Link
                key={car.id}
                href={`/search/${car.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="p-2 border-b border-gray-300 last:border-b-0 cursor-pointer hover:bg-gray-100 hover:pl-2 transition-all duration-300">
                  {car.name}
                </div>
              </Link>
            ))
          ) : (
            <div className="text-gray-500 text-center">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
