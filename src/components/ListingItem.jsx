import React from "react";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
export default function ListingItem({ listing }) {
  return (
    <div
      className="bg-white shadow-md hover:shadow-lg transition-shadow
    overflow-hidden rounded-lg sm:w-[250px] w-full
    "
    >
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt=""
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-110 transition-all z-999"
        />
        <div className="p-3 z-1 flex-col flex gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700 capitalize">
            {listing.name}
          </p>
          <div className="flex items-center gap-2">
            <MdLocationOn className="w-4 h-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate capitalize">
              {listing.address}
            </p>
          </div>
          <p className="line-clamp-2 text-sm text-gray-600 ">
            {listing.description}
          </p>
          <p className="text-slate-500 font-semibold mt-2">
            ${" "}
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex flex-row gap-x-4">
            <div className="font-bold text-sm">
              {listing.bedRooms}
              {listing.bedRooms > 1 ? " beds" : " bed"}
            </div>
            <div className="font-bold text-sm">
              {listing.bathRooms}
              {listing.bathRooms > 1 ? " beds" : " bed"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
