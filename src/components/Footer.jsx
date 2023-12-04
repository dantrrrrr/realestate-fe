import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-col w-full mt-6 px-12 py-8 max-h-[300px] bg-gray-900">
      <div className="flex flex-col sm:flex-row ">
        <div className="flex-1 p-3">
          <h1 className="text-gray-400 text-2xl font-bold">
            Dan Truong Real Estate
          </h1>
          <p className="py-3 text-gray-500 text-xs ">
            Welcome to Dan Truong Real Estate, where we are committed to
            providing exceptional real estate services. Our mission is to help
            you find the perfect property and make the home-buying process
            smooth and enjoyable.
          </p>
        </div>
        <div className="flex-1 p-3">
          <h1 className="text-gray-400 text-lg font-semibold">About</h1>
          <p className="py-2 text-gray-500 text-sm">
            Discover our story and how we strive to provide the best real estate
            services.
          </p>
        </div>
        <div className="flex-1 p-3">
          <h1 className="text-gray-400 text-lg font-semibold">Site</h1>
          <ul className="py-2">
            <li className="text-gray-500 text-sm cursor-pointer hover:text-gray-300">
              Home
            </li>
            <li className="text-gray-500 text-sm cursor-pointer hover:text-gray-300">
              Properties
            </li>
            <li className="text-gray-500 text-sm cursor-pointer hover:text-gray-300">
              Contact
            </li>
          </ul>
        </div>
        <div className="flex-1 p-3">
          <h1 className="text-gray-400 text-lg font-semibold">Help</h1>
          <ul className="py-2">
            <li className="text-gray-500 text-sm cursor-pointer hover:text-gray-300">
              FAQs
            </li>
            <li className="text-gray-500 text-sm cursor-pointer hover:text-gray-300">
              Customer Support
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-9 flex justify-between items-center w-full ">
        <p className="text-gray-500 text-center w-full">
          © 2023 Dan Truong Real Estate. All rights reserved.
        </p>
        {/* Add social media icons or other links here */}
      </div>
    </footer>
  );
}
