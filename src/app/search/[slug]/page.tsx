import { client } from "@/sanity/lib/client";
import { cars } from "@/app/types/CarsType";
import Image from "next/image";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

interface CarsPageProps {
  params: { slug: string }; // Dynamic route parameters
}

async function getCars(slug: string): Promise<cars | null> {
  return client.fetch(
    groq`*[_type == "car" && slug.current == $slug][0]{
      _id,
      name,
      _type,
      image,
      brand,
      type,
      fuelCapacity,
      transmission,
      seatingCapacity,
      pricePerDay,
      originalPrice,
      slug
    }`,
    { slug }
  );
}

export default async function CarsPage({ params }: CarsPageProps) {
  // Safely access the slug from params
  const { slug } = params;

  // Fetch car details
  const car = await getCars(slug);

  // Handle case where car data is not found
  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold">Car not found</h1>
        <p>
          We couldn&apos;t find the car you&apos;re looking for. Please check the URL
          or try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-8 items-center gap-8">
      {/* Car Image Section */}
      <div>
        {car.image ? (
          <Image
            src={urlFor(car.image).url()} // Use URL from Sanity
            alt={car.name}
            width={800}
            height={300}
            className="rounded-md shadow-lg"
          />
        ) : (
          <p>No image available</p>
        )}
      </div>

      {/* Car Details Section */}
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">{car.name}</h1>
        <p className="text-lg text-blue-600 font-semibold mb-4">
          Price per Day: ${car.pricePerDay}
        </p>
        <p className="text-lg text-gray-600 mb-1">Type: {car.type}</p>
        <p className="text-lg text-gray-600 mb-1">Transmission: {car.transmission}</p>
        <p className="text-lg text-gray-600 mb-1">
          Seating Capacity: {car.seatingCapacity} seats
        </p>
        <p className="text-lg text-gray-600 mb-4">Fuel Capacity: {car.fuelCapacity}</p>

        <Link href="/payment">
          <button className="bg-blue-500 text-white px-5 py-2 rounded-md shadow hover:bg-blue-600 transition">
            Rent Now
          </button>
        </Link>
      </div>
    </div>
  );
}
