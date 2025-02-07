"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { cars } from "@/app/types/CarsType";
import { useRouter } from "next/navigation";
import React from 'react';
import Image from "next/image";

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
    console.log("Car selected:", car.name);
    Swal.fire({
      title: "Booking Success",
      text: "Your booking has been successfully completed!",
      icon: "success",
    });
    router.push("/#");
  };

  const car: cars = {
    _id: "123",
    name: "Toyota Corolla",
    _type: "cars",
    image: {
      asset: {
        _ref: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg",
        _type: "image",
      },
    },
    seatingCapacity: "",
    originalPrice: "",
    slug: {
      _type: "slug",
      current: "",
    },
  };

  return (
    <div className="w-full sm:p-6 flex flex-wrap gap-6 justify-center">
    {/* Left Side Form */}
    <div className="cards w-full md:w-[90%] lg:w-[60%] grid grid-cols-1 gap-6">
      {/* Billing Info */}
      <div className="w-full border p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold text-gray-800">Billing Info</h2>
        <p className="text-gray-600">Please enter your billing info - Step 1 of 3</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {["name", "phone", "address", "city"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="font-bold text-gray-700" htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                placeholder={`Enter ${field}`}
                className="bg-gray-100 px-4 h-[56px] rounded-xl focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      </div>
  
      {/* Rental Info */}
      <div className="w-full border p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold text-gray-800">Rental Info</h2>
        <p className="text-gray-600">Please select your rental date - Step 2 of 3</p>
        {["pickup", "drop"].map((type) => (
          <div key={type} className="mt-4">
            <h3 className="font-bold text-gray-700 capitalize">{type} Details</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {["Location", "Date", "Time"].map((item) => (
                <div key={item} className="flex flex-col">
                  <label className="font-bold text-gray-700" htmlFor={`${type}${item}`}>
                    {type.charAt(0).toUpperCase() + type.slice(1)} {item}
                  </label>
                  <input
                    type={item === "Date" ? "date" : item === "Time" ? "time" : "text"}
                    id={`${type}${item}`}
                    name={`${type}${item}`}
                    className="bg-gray-100 px-4 h-[56px] rounded-xl focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
  
      {/* Confirmation */}
      <div className="w-full border p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-bold">Confirmation</h2>
        <p>Just a few clicks and your rental is ready - Step 3 of 3</p>
        <div className="flex flex-col gap-4 mt-6">
          {["marketing", "terms"].map((item) => (
            <label key={item} className="flex items-center gap-3 px-4 py-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" className="form-checkbox w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
              <span>
                {item === "marketing"
                  ? "I agree with receiving marketing and newsletter emails. No spam, promised!"
                  : "I agree with the terms and conditions and privacy policy."}
              </span>
            </label>
          ))}
        </div>
        <button
  onClick={(e) => handleSubmit(e, car)}
  className="w-full mt-6 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-900 text-white px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
>
  🚗 Add to Cart
</button>


      </div>
    </div>
  
    {/* Right Side Car Details */}
    <div className="w-full lg:w-[35%] bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Rental Summary</h2>
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
  

  );
}
