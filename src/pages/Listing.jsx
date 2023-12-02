import React, { useEffect, useState } from "react";
import axiosRequest from "../config/axiosRequest.js";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
  SwiperCore.use([Navigation]);

  const { id } = useParams();
  const [listingData, setListingData] = useState();
  const [loading, setLoading] = useState(false);
  console.log("🚀 ~ file: Listing.jsx:8 ~ Listing ~ loading:", loading);
  const [error, setError] = useState(false);
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
        </>
      )}
    </main>
  );
}
