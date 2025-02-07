"use client";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { urlFor } from "@/sanity/lib/image";
import { cars } from "@/app/types/CarsType";
import { useRouter } from "next/navigation";


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
    }`,
    { slug }
  );
}

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    dropLocation: "",
    dropDate: "",
    dropTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  const handleSubmit = (e: React.MouseEvent, car: cars) => {
    e.preventDefault();
    Swal.fire({
      title: "Booking Success",
      text: "Your booking has been successfully ",
      icon: "success",
    });
    router.push("/#");
  };

  const car : cars = {
    _id: "123",
    name: "Toyota Corolla",
    _type: "cars",
    "image": {
      "asset": {
        "_ref": "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg",
        "_type": "image"
      }
    },
    seatingCapacity: "",
    originalPrice: "",
    slug: {
      _type: "slug",
      current: ""
    }
  };

  return (
    <>
      <div className="w-[220px] sm:p-6 flex flex-wrap gap-6 justify-center]">
        <div className="cards w-full md:w-[70%] grid grid-cols-1 gap-6 order-2 lg:order-1">
          
          {/* Billing Info */}
          <div className="w-full lg:w-[852px] h-auto lg:h-[336px] flex flex-col justify-around border p-6 rounded-lg shadow-md">
            <div>
              <h2 className="text-xl font-bold">Billing Info</h2>
              <p className="w-full flex justify-between">
                <span>Please enter your billing info</span>
                <span>Step 1 of 3</span>
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="w-full flex flex-wrap gap-4">
                <div className="flex flex-col gap-3 w-full lg:w-[46%]">
                  <label className="font-bold" htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="bg-[#f6f7f9] px-4 h-[56px] rounded-xl"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-3 w-full lg:w-[50%]">
                  <label className="font-bold" htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Your Phone Number"
                    className="bg-[#f6f7f9] px-4 h-[56px] rounded-xl"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full flex flex-wrap gap-4">
                <div className="flex flex-col gap-3 w-full lg:w-[46%]">
                  <label className="font-bold" htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Your Address"
                    className="bg-[#f6f7f9] px-4 h-[56px] rounded-xl"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-3 w-full lg:w-[50%]">
                  <label className="font-bold" htmlFor="city">Town/City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Your City"
                    className="bg-[#f6f7f9] px-4 h-[56px] rounded-xl"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rental Info */}
          <div className="w-full lg:w-[852px] h-auto lg:h-[664px] flex flex-col justify-around border p-6 rounded-lg shadow-md">
            <div>
              <h2 className="text-xl font-bold">Rental Info</h2>
              <p className="w-full flex justify-between">
                <span>Please select your rental date</span>
                <span>Step 2 of 3</span>
              </p>
            </div>

            {/* Pick Up Section */}
            <Image src="/Pick - Up (1).png" alt="Pick Up" width={92} height={20} />
            <div className="w-full flex flex-wrap gap-4">
              <div className="flex flex-col gap-3 w-full lg:w-[46%]">
                <label className="font-bold" htmlFor="pickupLocation">Pickup Location</label>
                <select
                  id="pickupLocation"
                  name="pickupLocation"
                  className="bg-[#f6f7f9] px-4 h-[56px] rounded-xl"
                  onChange={handleChange}
                >
                  <option value="">Select Your City</option>
                </select>
              </div>
              <div className="flex flex-col gap-3 w-full lg:w-[50%]">
                <label className="font-bold" htmlFor="pickupDate">Pickup Date</label>
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  className="bg-[#f6f7f9] px-4 h-[56px] rounded-xl"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full lg:w-[45%]">
              <label className="font-bold" htmlFor="pickupTime">Pickup Time</label>
              <input
                type="time"
                id="pickupTime"
                name="pickupTime"
                className="bg-[#f6f7f9] px-4 h-[56px] rounded-xl"
                onChange={handleChange}
              />
            </div>

            {/* Drop Off Section */}
            <Image src="/Drop - Off (1).png" alt="Drop Off" width={104} height={20} />
            <div className="w-full flex flex-wrap gap-4">
              <div className="flex flex-col gap-3 w-full lg:w-[46%]">
                <label className="font-bold" htmlFor="dropLocation">Drop Off Location</label>
                <select
                  id="dropLocation"
                  name="dropLocation"
                  className="bg-[#f6f7f9] px-4 h-[56px] rounded-xl"
                  onChange={handleChange}
                >
                  <option value="">Select Your City</option>
                </select>
              </div>
              <div className="flex flex-col gap-3 w-full lg:w-[50%]">
                <label className="font-bold" htmlFor="dropDate">Drop Off Date</label>
                <input
                  type="date"
                  id="dropDate"
                  name="dropDate"
                  className="bg-[#f6f7f9] px-4 h-[56px] rounded-xl"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full lg:w-[45%]">
              <label className="font-bold" htmlFor="dropTime">Drop Off Time</label>
              <input
                type="time"
                id="dropTime"
                name="dropTime"
                className="bg-[#f6f7f9] px-4 h-[56px] rounded-xl"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='w-[220px] sm:p-6 flex flex-wrap gap-6 justify-center font-[family-name:var(--font-geist-sans)]'>
        <div className='cards w-full md:w-[70%] grid grid-cols-1 gap-6 order-2 lg:order-1'>

        
      <div className="w-full lg:w-[852px] h-auto flex flex-col justify-around p-6 shadow-lg rounded-xl bg-white">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold">Confirmation</h2>
        <div className="flex items-center justify-between">
          <h1>
            We are getting to the end. Just a few clicks and your rental is ready
          </h1>
          <h1>Step 3 of 3</h1>
        </div>
      </div>

      {/* Checkbox Section */}
      <div className="flex flex-col gap-4 mt-6">
        <label className="flex items-center gap-3 px-4 py-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <span>I agree with sending marketing and newsletter emails. No spam, promised!</span>
        </label>
        <label className="flex items-center gap-3 px-4 py-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <span>I agree with our terms and conditions and privacy policy.</span>
        </label>
      </div>
    </div>
    <button onClick={(e) => handleSubmit(e, car)}  
  className="w-full mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
  Add to Cart
</button>

</div>

{/* Right side  */}
<div className='w-[800px] pt-40 flex-shrink-0 lg:w-[40%] order-1 lg:order-2 flex justify-center relative lg:absolute lg:top-4 lg:right-4'>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Rental Summary Section */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Rental Summary</h2>
          <p className="text-sm text-gray-500 mb-4">
            Prices may change depending on the length of the rental and the price of your rental car.
          </p>

          {/* Car Image & Name */}
          <div className="flex items-center gap-4 mb-6">
            {car?.image && (
              <div className="w-[100px] h-[100px] relative">
                <Image
                 src="/View 1.png"
                 alt="Car Image"
                 className="w-full h-full object-cover rounded-lg"
                 width={100}
                 height={100}
                />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">{car?.name}</h3>
              <div className="flex items-center text-yellow-500">
                {/* Example Star Ratings */}
                <span className="mr-2">⭐ ⭐ ⭐ ⭐ ☆</span>
                <span className="text-gray-500 text-sm">440+ Reviewers</span>
              </div>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Tax</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span>Apply promo code</span>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                Apply now
              </button>
            </div>
            <div className="border-t border-gray-300 pt-4 flex justify-between text-lg font-semibold text-gray-800">
              <span>Total Rental Price</span>
            </div>
          </div>
        </div>
      </div>
    </div>
      
</div>

    </>
  );
}