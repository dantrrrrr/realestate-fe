import React from "react";
import { Link } from "react-router-dom";
export default function ListingItem({ listing }) {
  return (
    <div>
      <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0]} alt="" />
      </Link>
      ;
    </div>
  );
}
