import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosRequest from "../config/axiosRequest";

export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFormUrl = urlParams.get("searchTerm");
    const typeFormUrl = urlParams.get("type");
    const parkingFormUrl = urlParams.get("parking");
    const offerFormUrl = urlParams.get("offer");
    const furnishedFormUrl = urlParams.get("furnished");
    const sortFormUrl = urlParams.get("sort");
    const orderFormUrl = urlParams.get("order");
    if (
      searchTermFormUrl ||
      typeFormUrl ||
      parkingFormUrl ||
      offerFormUrl ||
      furnishedFormUrl ||
      sortFormUrl ||
      orderFormUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFormUrl || "",
        type: typeFormUrl || "all",
        parking: parkingFormUrl === "true" ? true : false,
        offer: offerFormUrl === "true" ? true : false,
        furnished: furnishedFormUrl === "true" ? true : false,
        sort: sortFormUrl || "createdAt",
        order: orderFormUrl || "desc",
      });
    }

    const fetchListing = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await axiosRequest.get(`/api/listing/get?${searchQuery}`);
        setListings(res.data);
        console.log(
          "🚀 ~ file: Search.jsx:54 ~ fetchListing ~ res.data:",
          res.data
        );
      } catch (error) {
        console.log("🚀 ~ file: Search.jsx:54 ~ fetchListing ~ error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [window.location.search]);
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({ ...sidebarData, sort, order });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);

    const searchQuery = urlParams.toString();
    console.log(
      "🚀 ~ file: Search.jsx:55 ~ handleSubmit ~ searchQuery:",
      searchQuery
    );
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className="flex md:flex-row flex-col">
      <div className="p-6 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 mt-3">
            <label
              className="capitalize whitespace-nowrap font-semibold"
              htmlFor="searchTerm"
            >
              search Term :
            </label>
            <input
              onChange={handleChange}
              value={sidebarData.searchTerm}
              type="text"
              id="searchTerm"
              name="searchTerm"
              placeholder="Search..."
              className="border py-2 px-3 rounded-lg w-full"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label htmlFor="type" className="font-semibold">
              Type:
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="all"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="rent"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <span>Rent </span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="sale"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "sale"}
              />
              <span> Sale</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label htmlFor="type" className="font-semibold">
              Amenities:
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="font-semibold">
              Sort:
            </label>
            <select
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
              name="sort_order"
              id="sort_order"
              className="px-2 py-1 rounded-lg focus:outline-none border"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Lastest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white rounded-lg uppercase py-2 hover:opacity-90 transition-all shadow-lg">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-600 mt-5">
          Listing result
        </h1>
      </div>
    </div>
  );
}
