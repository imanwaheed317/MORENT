import React from 'react';
export default function Footer() {
  return (
    <div className=" pt-16 relative flex flex-col items-center justify-center gap-6 px-5 w-full bg-white py-6 space-y-10">
      <div className="first w-full flex flex-wrap items-start justify-between gap-6">
        {/* Intro Section */}
        <div className="intro flex flex-col gap-2 w-full lg:w-auto">
          <h1 className="text-[#3563e9] text-2xl lg:text-3xl font-bold text-center lg:text-left pt-2">MORENT</h1>
          <p className="text-gray-500 text-center lg:text-left w-[300px] pt-4">
            Our vision is to provide convenience and help increase your sales business.
          </p>
        </div>

        {/* Lists Section */}
        <div className=" flex flex-wrap gap-24 space-x-7  justify-center lg:justify-between w-full lg:w-auto lg:mr-10">
          <div className="about">
            <ul className="flex flex-col gap-1 space-y-4">
              <li className="font-bold text-lg space-y-10"><h1>About</h1></li>
              <li className="hover:text-[#3563e9] cursor-pointer">How it works</li>
              <li className="hover:text-[#3563e9] cursor-pointer">Featured</li>
              <li className="hover:text-[#3563e9] cursor-pointer">Partnership</li>
              <li className="hover:text-[#3563e9] cursor-pointer">Business Relation</li>
            </ul>
          </div>
          <div className="community">
            <ul className="flex flex-col gap-1 space-y-4">
              <li className="font-bold text-lg"><h1>Community</h1></li>
              <li className="hover:text-[#3563e9] cursor-pointer">Events</li>
              <li className="hover:text-[#3563e9] cursor-pointer">Blog</li>
              <li className="hover:text-[#3563e9] cursor-pointer">Podcast</li>
              <li className="hover:text-[#3563e9] cursor-pointer">Invite a friend</li>
            </ul>
          </div>
          <div className="socials">
            <ul className="flex flex-col gap-1 space-y-4">
              <li className="font-bold text-lg"><h1>Socials</h1></li>
              <li className="flex items-center gap-2 hover:text-[#3563e9] cursor-pointer">
             Discord
              </li>
              <li className="flex items-center gap-2 hover:text-[#3563e9] cursor-pointer">
                 Instagram
              </li>
              <li className="flex items-center gap-2 hover:text-[#3563e9] cursor-pointer">
                Facebook
              </li>
              <li className="flex items-center gap-2 hover:text-[#3563e9] cursor-pointer">
              Twitter
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="line border-t w-full border-[#c6cace] shadow-sm "></div>

      {/* Bottom Section */}
      <div className="last w-full flex flex-wrap items-center justify-between gap-4 ">
        <div className="first text-center lg:text-left w-full lg:w-auto">
          <h1 className="font-bold text-sm">©2022 MORENT. All rights reserved</h1>
        </div>
        <div className="second flex flex-wrap justify-center lg:justify-end items-center gap-4 w-full lg:w-auto">
          <h1 className="font-bold text-sm hover:text-[#3563e9] cursor-pointer">Privacy & Policy</h1>
          <h1 className="font-bold text-sm hover:text-[#3563e9] cursor-pointer">Terms & Conditions</h1>
        </div>
      </div>
    </div>
  );
}
