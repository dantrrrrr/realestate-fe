import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosRequest from "../config/axiosRequest";
import SearchListings from "../components/SearchListings";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

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
        setShowMore(false);
        const searchQuery = urlParams.toString();
        const res = await axiosRequest.get(`/api/listing/get?${searchQuery}`);
        setListings(res.data);
        res.data.length > 8 ? setShowMore(true) : setShowMore(false);
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
        [e.target.id]: e.target.checked || e.target.checked,
      });
    }
    if (e.target.id === "sort_order") {
      const [sort, order] = e.target.value.split("_");
      setSidebarData({
        ...sidebarData,
        sort: sort || "createdAt",
        order: order || "desc",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    // Only include parameters in the URL if they are different from the default values
    if (sidebarData.searchTerm !== "") {
      urlParams.set("searchTerm", sidebarData.searchTerm);
    }
    if (sidebarData.type !== "all") {
      urlParams.set("type", sidebarData.type);
    }
    if (sidebarData.offer) {
      urlParams.set("offer", sidebarData.offer);
    }
    if (sidebarData.furnished) {
      urlParams.set("furnished", sidebarData.furnished);
    }
    if (sidebarData.parking) {
      urlParams.set("parking", sidebarData.parking);
    }
    if (sidebarData.sort !== "createdAt") {
      urlParams.set("sort", sidebarData.sort);
    }
    if (sidebarData.order !== "desc") {
      urlParams.set("order", sidebarData.order);
    }

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };
  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams();

    urlParams.set("startIndex", startIndex);

    const searchQuery = urlParams.toString();

    try {
      const res = axiosRequest.get(`/api/listing/get?${searchQuery}`);
      const data = (await res).data;
      setListings([...listings, ...data]);
    } catch (error) {
      console.log(
        "🚀 ~ file: Search.jsx:140 ~ onShowMoreClick ~ error:",
        error
      );
    } finally {
      console.log(listings.length);
    }
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
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-center text-slate-600 mt-5">
          Listing result
        </h1>
        <div className="p-7 flex flex-col  gap-4">
          {!loading && listings.length === 0 && (
            <h1 className="text-xl text-slate-700 text-center py-2">
              No listing found
            </h1>
          )}
          {loading && (
            <h1 className="text-xl text-slate-700 text-center w-full">
              Loading...
            </h1>
          )}
          <div className="flex flex-wrap gap-4">
            {!loading &&
              listings &&
              listings.map((listing, index) => (
                <ListingItem key={index} listing={listing} />
              ))}
          </div>
        </div>
        {showMore && (
          <button
            onClick={onShowMoreClick}
            className="text-green-700 hover:underline p-7 text-center w-full"
          >
            Show more
          </button>
        )}
        <SearchListings />
      </div>
    </div>
  );
}
