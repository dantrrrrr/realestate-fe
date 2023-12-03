import React from "react";

export default function Search() {
  return (
    <div className="flex md:flex-row flex-col">
      <div className="p-6 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2 mt-3">
            <label
              className="capitalize whitespace-nowrap font-semibold"
              htmlFor="searchTerm"
            >
              search Term :
            </label>
            <input
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
              <input type="checkbox" name="all" id="all" className="w-5" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="rent" id="rent" className="w-5" />
              <span>Rent </span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="sale" id="sale" className="w-5" />
              <span> Sale</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="offer" id="offer" className="w-5" />
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
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="font-semibold">
              Sort:
            </label>
            <select
              name="sort_order"
              id="sort_order"
              className="px-2 py-1 rounded-lg focus:outline-none border"
            >
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
              <option value="">Lastest</option>
              <option value="">Oldest</option>
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
