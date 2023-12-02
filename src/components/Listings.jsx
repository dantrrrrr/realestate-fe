import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import axiosRequest from "../config/axiosRequest";
import toast from "react-hot-toast";
import { useUserSelector } from "../redux/user/userSlice";

export default function Listings(props) {
  const { currentUser: user } = useUserSelector();
  const [userListings, setUserListings] = useState([]);

  //   {
  //     userListings && (
  //
  //     );
  //   }
  const handleShowListings = async () => {
    try {
      const res = await axiosRequest.get(`/api/user/listing/${user._id}`);

      setUserListings(res.data);
      console.log(userListings);
    } catch (error) {
      //   setShowListingsError(true);
      toast.error("Error while showing listings", error);
    }
  };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await axiosRequest.delete(`/api/listing/delete/${listingId}`);
      res.data && toast.success(res.data);
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <button onClick={handleShowListings} className="text-green-700 w-full ">
        Show listings
      </button>

      {userListings.length > 0 && userListings && (
        <h1 className="font-bold text-2xl text-center my-4">My Listing</h1>
      )}
      <div className="flex flex-wrap gap-2 justify-between mt-5 transition-all">
        {userListings.length > 0 &&
          userListings.map((listing, index) => (
            <div
              key={index}
              className="flex flex-col border w-[45%] items-center justify-center p-3 rounded-lg shadow-lg"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="w-[100%] rounded-lg object-contain"
                />
              </Link>
              <Link to={`/listing/${listing._id}`} className="mt-2">
                <p className="text-slate-700 font-semibold truncate">
                  {" "}
                  {listing.name}
                </p>
              </Link>
              <div className="flex items-center mt-2 gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => handleListingDelete(listing._id)}
                >
                  <MdDeleteForever
                    size={24}
                    className="text-red-800 hover:text-red-600"
                  />
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button type="button">
                    <MdModeEdit
                      size={24}
                      className="text-blue-800 hover:text-blue-600"
                    />
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
