"use client";

import { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { toast } from "react-hot-toast"; // Import toast notifications

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlistCars") || "[]");
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlist.filter((car) => car._id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlistCars", JSON.stringify(updatedWishlist));

    // Update likedCars
    const likedCars = JSON.parse(localStorage.getItem("likedCars") || "{}");
    delete likedCars[id];
    localStorage.setItem("likedCars", JSON.stringify(likedCars));

    // ✅ Show toast notification
    toast.error("Removed from Wishlist");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">My Wishlist</h2>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((car) => (
            <div
              key={car._id}
              className="relative bg-white shadow-md rounded-xl overflow-hidden transform transition duration-300 hover:shadow-lg"
            >
              {/* Heart Icon (Remove from Wishlist) */}
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => removeFromWishlist(car._id)}
              >
                <GoHeart className="text-2xl text-gray-400 hover:text-red-500 transition" />
              </div>

              {/* Car Image */}
              {car.image && (
                <Image
                  src={urlFor(car.image).url()}
                  alt={car.name}
                  width={1700}
                  height={500}
                  className="w-full h-40 object-cover"
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
      ) : (
        <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
      )}
    </div>
  );
};

// ✅ Assigning component to a variable before exporting
export default Wishlist;
