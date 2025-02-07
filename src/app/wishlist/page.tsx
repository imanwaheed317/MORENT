"use client";
import { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Car {
  _id: string;
  name: string;
  brand: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  pricePerDay: string;
  slug?: { current: string };
  image?: string;
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Car[]>([]);

  useEffect(() => {
    const savedWishlist: Car[] = JSON.parse(localStorage.getItem("wishlistCars") || "[]");

    // Remove duplicates using Map()
    const uniqueWishlist = Array.from(new Map(savedWishlist.map(car => [car._id, car])).values());
    setWishlist(uniqueWishlist);
  }, []);

  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlist.filter((car) => car._id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlistCars", JSON.stringify(updatedWishlist));

    // Also update likedCars
    const likedCars = JSON.parse(localStorage.getItem("likedCars") || "{}");
    delete likedCars[id];
    localStorage.setItem("likedCars", JSON.stringify(likedCars));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">My Wishlist</h2>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((car) => (
            <div
              key={car._id}
              className="relative bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105"
            >
              {/* Car Image */}
              {car.image && (
                <div className="w-full h-48">
                  <Image
                    src={urlFor(car.image).url()}
                    alt={car.name}
                    width={250}
                    height={100}
                    className="object-cover rounded-t-lg"
                  />
                </div>
              )}

              {/* Car Details */}
              <div className="p-4 text-gray-800">
                <h3 className="text-xl font-semibold">{car.name}</h3>
                <p className="text-gray-500 text-sm">{car.brand}</p>

                <div className="flex items-center space-x-3 text-gray-600 mt-2 text-sm">
                  <span>{car.fuelCapacity}</span>
                  <span>{car.transmission}</span>
                  <span>{car.seatingCapacity}</span>
                </div>

                <p className="text-lg font-bold text-blue-600 mt-3">
                  {car.pricePerDay} /day
                </p>

                {/* Rent & Remove Buttons */}
                <div className="flex gap-2 mt-4">
                  {car.slug ? (
                    <Link href={`/product/${car.slug.current}`} className="w-1/2">
                      <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition">
                        Rent Now
                      </button>
                    </Link>
                  ) : (
                    <p className="text-red-500 mt-2">Slug not available</p>
                  )}

                  <button
                    className="w-1/2 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
                    onClick={() => removeFromWishlist(car._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg text-center">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
