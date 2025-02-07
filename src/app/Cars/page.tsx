"use client";

import { client } from "@/sanity/lib/client";
import { allcars } from "@/sanity/lib/queries";
import { cars } from "@/app/types/CarsType";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";

const Cars = () => {
  const [carsData, setCars] = useState<cars[]>([]);
  const [likedCars, setLikedCars] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    async function fetchCars() {
      const fetchedCars: cars[] = await client.fetch(allcars);
      setCars(fetchedCars);
      
      // Store fetched cars in localStorage
      localStorage.setItem("carsData", JSON.stringify(fetchedCars));
    }
    fetchCars();

    // Load liked cars from localStorage
    const storedLikes = JSON.parse(localStorage.getItem("likedCars") || "{}");
    setLikedCars(storedLikes);
  }, []);

  const toggleLike = (car: cars) => {
    setLikedCars((prev) => {
      const updatedLikes = { ...prev, [car._id]: !prev[car._id] };
      localStorage.setItem("likedCars", JSON.stringify(updatedLikes)); // Save to localStorage
      
      // Store wishlist data
      const savedWishlist = JSON.parse(localStorage.getItem("wishlistCars") || "[]");

      if (updatedLikes[car._id]) {
        // Add to wishlist
        const updatedWishlist = [...savedWishlist, car];
        localStorage.setItem("wishlistCars", JSON.stringify(updatedWishlist));
      } else {
        // Remove from wishlist
        const updatedWishlist = savedWishlist.filter((c: cars) => c._id !== car._id);
        localStorage.setItem("wishlistCars", JSON.stringify(updatedWishlist));
      }

      return updatedLikes;
    });
  };

  return (
    <div className="max-w-10xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Popular Cars</h1>
        <Link href="/#" className="text-blue-600 hover:text-blue-800 text-lg font-medium">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {carsData.map((car) => (
          <div
            key={car._id}
            className="relative bg-white shadow-md rounded-xl overflow-hidden transform transition duration-300 hover:shadow-lg"
          >
            {/* Heart Icon */}
            <div
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => toggleLike(car)}
            >
              <GoHeart
                className={`text-2xl transition duration-300 ${
                  likedCars[car._id] ? "text-red-500" : "text-gray-400"
                }`}
              />
            </div>

            {/* Car Image */}
            {car.image && (
              <img
                src={urlFor(car.image).width(250).height(100).url()}
                alt={car.name}
                className="object-cover"
              />
            )}

            {/* Car Info */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">{car.name}</h2>
              <p className="text-gray-500 text-sm">{car.brand}</p>

              {/* Features */}
              <div className="flex items-center space-x-3 text-gray-600 mt-2 text-sm">
                <span>{car.fuelCapacity}</span>
                <span>{car.transmission}</span>
                <span>{car.seatingCapacity}</span>
              </div>

              {/* Price */}
              <p className="text-base font-bold text-gray-900 mt-2">
                {car.pricePerDay} /day
              </p>

              {/* Rent Button */}
              {car.slug ? (
                <Link href={`/product/${car.slug.current}`}>
                  <button className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition">
                    Rent Now
                  </button>
                </Link>
              ) : (
                <p className="text-red-500 mt-2">Slug not available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
