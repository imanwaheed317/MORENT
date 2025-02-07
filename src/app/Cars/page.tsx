"use client";

import { client } from "@/sanity/lib/client";
import { allcars } from "@/sanity/lib/queries";
import { cars } from "@/app/types/CarsType";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
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
      localStorage.setItem("carsData", JSON.stringify(fetchedCars));
    }
    fetchCars();

    const storedLikes = JSON.parse(localStorage.getItem("likedCars") || "{}");
    setLikedCars(storedLikes);
  }, []);

  const toggleLike = (car: cars) => {
    setLikedCars((prev) => {
      const updatedLikes = { ...prev, [car._id]: !prev[car._id] };
      localStorage.setItem("likedCars", JSON.stringify(updatedLikes));

      const savedWishlist = JSON.parse(localStorage.getItem("wishlistCars") || "[]");
      if (updatedLikes[car._id]) {
        const updatedWishlist = [...savedWishlist, car];
        localStorage.setItem("wishlistCars", JSON.stringify(updatedWishlist));
      } else {
        const updatedWishlist = savedWishlist.filter((c: cars) => c._id !== car._id);
        localStorage.setItem("wishlistCars", JSON.stringify(updatedWishlist));
      }
      return updatedLikes;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-2 py-2 ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Popular Cars</h1>
        <Link href="/#" className="text-blue-600 hover:text-blue-800 text-lg font-medium">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 border-collapse">
        {carsData.map((car) => (
          <div
            key={car._id}
            className="relative bg-white border-4 rounded-xl shadow-lg hover:shadow-blue-100 overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col h-full"
            >
            {/* Like Button */}
            <div
              className="absolute top-4 right-4 cursor-pointer p-2 rounded-full bg-white shadow-lg hover:bg-red-400 transition"
              onClick={() => toggleLike(car)}
            >
              <GoHeart
                className={`text-3xl transition duration-300 ${
                  likedCars[car._id] ? "text-red-500 scale-110" : "text-gray-400"
                }`}
              />
            </div>

            {/* Car Image */}
            {car.image && (
              <Image
                src={urlFor(car.image).url()}
                alt={car.name}
                width={250}
                height={180}
                className="object-cover rounded-t-xl mt-16 ml-5"
              />
            )}

            {/* Car Details */}
            <div className="p-6 flex flex-col grow">
              <h2 className="text-2xl font-semibold text-gray-900">{car.name}</h2>
              <p className="text-gray-500 text-sm">{car.brand}</p>

              <div className="flex items-center space-x-3 text-gray-600 mt-2 text-sm">
                <span>⛽ {car.fuelCapacity}</span>
                <span>⚙ {car.transmission}</span>
                <span>🛋 {car.seatingCapacity}</span>
              </div>

              <p className="text-lg font-bold text-blue-600 mt-3">{car.pricePerDay}</p>

              {car.slug ? (
                <Link href={`/product/${car.slug.current}`}>
                  <button className="w-full mt-6 bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 text-white px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
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
