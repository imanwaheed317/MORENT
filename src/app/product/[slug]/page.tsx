import { client } from "@/sanity/lib/client";
import { cars } from "@/app/types/CarsType";
import Image from "next/image";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { GoHeart } from "react-icons/go";


interface CarsPageProps {
  params: { slug: string };
}

async function getCars(slug: string): Promise<cars> {
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
  const { slug } = params;
  const car = await getCars(slug);

  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold">Car not found</h1>
        <p>We couldn't find the car you're looking for. Please check the URL or try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row max-w-7xl pl-12 py-8 gap-6">
      {/* Left Sidebar */}
      <aside className=" md:w-1/4 bg-white shadow-md p-4 rounded-lg overflow-y-auto ">
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm">BRAND</h3>
          <div className="space-y-3 text-gray-50">
            {["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"].map((type, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 text-blue-500 focus:ring-blue-500" />
                <label className="text-gray-800">
                  {type} <span className="text-gray-400">(10)</span>
                </label>
              </div>
            ))}
          </div>
        </div>
  
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm">CAPACITY</h3>
          <div className="space-y-3 text-gray-50">
            {["2 Person", "4 Person", "6 Person", "8 or More"].map((capacity, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 text-blue-500 focus:ring-blue-500" />
                <label className="text-gray-800">
                  {capacity} <span className="text-gray-400">(10)</span>
                </label>
              </div>
            ))}
          </div>
        </div>
  
        <div>
        </div>
      </aside>
  
      {/* Right Section */}
<div className="flex flex-col md:flex-row gap-12 mt-8 pt-20 bg-gray-50 p-8 rounded-xl shadow-lg relative">
  {/* Car Image Section */}
  <div className="md:w-1/2 mx-auto px-4 py-8">
    {/* Heart Icon */}
    <div className="absolute top-4 right-4">
      <GoHeart className="text-gray-400 text-3xl cursor-pointer hover:text-red-500 transition duration-300 ease-in-out" />
    </div>

    {/* Large Image */}
    <div className="mb-6">
      {car.image && (
        <Image
          src={urlFor(car.image).url()}
          alt={car.name}
          width={1700}
          height={500}
        />
      )}
    </div>

    {/* Small Images */}
    <div className="flex justify-center gap-4">
      {["/car1.png", "/car2.png", "/car3.png"].map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`pic-${index}`}
          width={150}
          height={150}
          className="object-cover rounded-lg cursor-pointer shadow-md hover:scale-105 transform transition duration-300 ease-in-out"
        />
      ))}
    </div>
  </div>

  {/* Car Details Section */}
  <div className="w-full md:w-1/2 flex flex-col gap-6">
    <h1 className="text-4xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
      {car.name}
    </h1>

    <p className="text-lg text-gray-600">
      <span className="font-semibold">Brand:</span> {car.brand}
    </p>
    <p className="text-lg text-gray-600">
      <span className="font-semibold">Fuel Capacity:</span> {car.fuelCapacity}
    </p>
    <p className="text-lg text-gray-600">
      <span className="font-semibold">Transmission:</span> {car.transmission}
    </p>
    <p className="text-lg text-gray-600">
      <span className="font-semibold">Seating Capacity:</span> {car.seatingCapacity}
    </p>
    <p className="text-lg text-gray-600">
      <span className="font-semibold">Price Per Day:</span> ${car.pricePerDay}
    </p>
    <p className="text-lg text-gray-600">
      <span className="font-semibold">Original Price:</span> ${car.originalPrice}
    </p>

    <Link href="/payment">
      <button className="bg-[#3563e9] text-white px-6 py-3 mt-4 rounded-lg shadow-md hover:bg-blue-600 transform transition duration-300 ease-in-out">
        Rent Now
      </button>
    </Link>
  </div>
</div>
</div>
  );
}  
