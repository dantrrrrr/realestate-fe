import React, { useEffect, useState } from "react";
import axiosRequest from "../config/axiosRequest.js";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useUserSelector } from "../redux/user/userSlice.js";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact.jsx";
export default function Listing() {
  SwiperCore.use([Navigation]);

  const { id } = useParams();
  const [listingData, setListingData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser: user } = useUserSelector();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await axiosRequest.get(`/api/listing/get/${id}`);

        setListingData(res.data);
      } catch (error) {
        setError(error);

        console.log("🚀 ~ file: Listing.jsx:13 ~ fetchListing ~ error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);
  // console.log(loading);
  return (
    <main>
      {loading && <p className="text-center my-7  text-2xl">loading....</p>}
      {error && <p className="text-center my-7  text-2xl">error</p>}

      {listingData && !loading && !error && (
        <>
          <Swiper navigation>
            {listingData.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listingData.name} - ${" "}
              {listingData.offer
                ? listingData.discountPrice.toLocaleString("en-US")
                : listingData.regularPrice.toLocaleString("en-US")}
              {listingData.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listingData.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listingData.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listingData.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listingData.regularPrice - +listingData.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listingData.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listingData.bedRooms > 1
                  ? `${listingData.bedRooms} beds `
                  : `${listingData.bedRooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listingData.bathRooms > 1
                  ? `${listingData.bathRooms} baths `
                  : `${listingData.bathRooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listingData.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listingData.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {user && listingData.userRef !== user._id && !contact && (
              // {user && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listingData={listingData} />}
          </div>
        </>
      )}
    </main>
  );
}
