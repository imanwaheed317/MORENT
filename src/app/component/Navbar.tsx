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
    <div className="w-full bg-white h-auto flex flex-col items-center p-4 md:p-8 border-b-2 border-[#e7eef6]">
      {/* Navbar Container */}
      <div className="flex flex-col md:flex-row justify-between w-full items-center gap-6 md:gap-16">
        {/* Left Section */}
        <div className="first flex flex-col md:flex-row items-center gap-4 md:gap-16 w-full">
          <h1 className="text-[#3563e9] text-4xl font-bold">MORENT</h1>
          <div className="input relative w-full">
            <Image
              src={"/search-normal.png"}
              alt="search icon"
              width={24}
              height={24}
              className="absolute top-1/2 left-3 transform -translate-y-1/2"
            />
            <input
              type="text"
              title="search"
              placeholder="Search for cars..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="border-2 border-[#e7eef6] w-full md:w-[492px] h-[44px] rounded-full p-2 pl-10 pr-12"
            />
            <Image
              src={"/filter.png"}
              alt="filter icon"
              width={24}
              height={24}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="icons flex items-center gap-6 mt-4 md:mt-0">
          <Link href="/wishlist">
            <div className="relative">
              <FaHeart className="text-2xl" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                  {wishlistCount}
                </span>
              )}
            </div>
          </Link>
          <div className="icon-container flex items-center gap-6 text-2xl">
            <div className="relative">
              <FaBell />
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
            </div>
            <FaCog />
          </div>
          <div className="profile flex items-center">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-[#3563e9] text-white px-4 py-2 rounded-md">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="search-results mt-2 bg-gray-100 p-4 rounded-md shadow-md w-full md:w-[492px]">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <Link
                key={car.id}
                href={`/search/${car.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="result-item p-2 border-b border-gray-300 last:border-b-0 cursor-pointer hover:bg-gray-200">
                  {car.name}
                </div>
              </Link>
            ))
          ) : (
            <div className="text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
