import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { GoHeart } from "react-icons/go";

// Define Props
interface CarsPageProps {
  params: {
    slug: string;
    searchParams?: Record<string, string | string[] | undefined>;
  };
}

// Define Car Image Type
interface CarImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

// Define Car Object Type
interface Car {
  _id: string;
  name: string;
  brand: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  pricePerDay: number;
  originalPrice: number;
  slug: string;
  image: CarImage[];
}

// Fetch car data based on the slug
async function getCars(slug: string): Promise<Car | null> {
  return client.fetch(
    groq`*[_type == "car" && slug.current == $slug][0]{
      _id,
      name,
      brand,
      type,
      fuelCapacity,
      transmission,
      seatingCapacity,
      pricePerDay,
      originalPrice,
      slug,
      "image": image[].asset->_ref // Fetch full image reference
    }`,
    { slug }
  );
}

// Dynamic page component
export default async function CarsPage({ params }: CarsPageProps) {
  const { slug } = params;
  const car = await getCars(slug);

  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-4 text-center py-20">
        <h1 className="text-3xl font-bold text-gray-800">Car Not Found</h1>
        <p className="text-gray-600">Sorry, we could not find the car you are looking for.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
      {/* Car Details Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white shadow-2xl rounded-xl p-6 md:p-12 relative overflow-hidden">
        {/* Floating Heart Icon */}
        <div className="absolute top-4 right-4">
          <GoHeart className="text-gray-300 text-4xl cursor-pointer hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-110" />
        </div>

        {/* Car Image Section */}
        <div className="relative flex flex-col items-center">
          {car.image && car.image.length > 0 && urlFor(car.image[0]) ? (
            <Image
              src={urlFor(car.image[0]).url()} 
              alt={car.name}
              width={700}
              height={450}
              className="rounded-xl shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          ) : (
            <p className="text-gray-500">Image not available</p>
          )}
        </div>

        {/* Car Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-5xl font-extrabold text-gray-700 mb-4">{car.name}</h1>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Brand:</span> {car.brand}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-serif">Fuel Capacity:</span> {car.fuelCapacity}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-serif">Transmission:</span> {car.transmission}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-serif">Seating Capacity:</span> {car.seatingCapacity}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-serif">Price Per Day:</span>{" "}
              <span className="text-[#3563e9] font-bold text-xl">${car.pricePerDay}</span>
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-serif">Original Price:</span>{" "}
              <span className="line-through text-gray-500">${car.originalPrice}</span>
            </p>
          </div>

          {/* Rent Now Button */}
          <Link href="/payment">
            <button className="w-full bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 text-white px-8 py-3 mb-14 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              Rent Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
