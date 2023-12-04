import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axiosRequest from "../config/axiosRequest";
import ListingItem from "../components/ListingItem";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
export default function Home() {
  SwiperCore.use([Navigation]);

  const [offerListings, setOfferListings] = useState([]);

  const [saleListings, setSaleListings] = useState([]);

  const [rentListings, setRentListings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offerRes, saleRes, rentRes] = await Promise.all([
          axiosRequest.get("/api/listing/get?offer=true&limit=4"),
          axiosRequest.get("/api/listing/get?type=sale&limit=4"),
          axiosRequest.get("/api/listing/get?type=rent&limit=4"),
        ]);

        setOfferListings(offerRes.data);
        setSaleListings(saleRes.data);
        setRentListings(rentRes.data);
      } catch (error) {
        console.log(
          "🚀 ~ file: Home.jsx:12 ~ fetchOfferListings ~ error:",
          error
        );
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Discover Your Next
          <span className="text-slate-500"> Perfect</span>
          <br />
          Place with Ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          DanEstate is your key to finding the perfect home. Whether you're
          searching for a cozy apartment, a spacious house, or a trendy loft, we
          offer a diverse range of properties to suit your unique needs.
        </div>
        <Link
          className="sm:text-sm text-xs text-blue-800 font-bold hover:underline"
          to={"/search"}
        >
          Let's get started...
        </Link>
      </div>
      {/* slider */}
      <Swiper navigation className="">
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                className="h-[500px] "
                key={listing._id}
                style={{
                  background: `url(${listing.imageUrls[0]}) center  no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing for some ... */}

      <div className="max-w-6xl mx-auto flex flex-col gap-8 my-10 ">
        {offerListings && offerListings.length > 0 && (
          <>
            <div className="">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline hover:ml-3 transition-all"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap  gap-6">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </>
        )}

        {saleListings && saleListings.length > 0 && (
          <>
            <div className="">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent sales
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline hover:ml-3 transition-all"
                to={"/search?offer=true"}
              >
                Show more sales
              </Link>
            </div>
            <div className="flex flex-wrap  gap-6">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </>
        )}

        {rentListings && rentListings.length > 0 && (
          <>
            <div className="">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent sales
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline hover:ml-3 transition-all"
                to={"/search?offer=true"}
              >
                Show more sales
              </Link>
            </div>
            <div className="flex flex-wrap  gap-6">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
