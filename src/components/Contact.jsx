import { useEffect, useState } from "react";
import axiosRequest from "../config/axiosRequest";
import { Link } from "react-router-dom";

export default function Contact({ listingData }) {
  const [landlord, setLandlord] = useState();
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await axiosRequest.get(
          `/api/user/get/${listingData.userRef}`
        );
        setLandlord(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listingData.userRef]);
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">
              {listingData.name.toLowerCase()}
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-3 w-full border rounded-lg "
            placeholder="enter your message..."
          ></textarea>
          <Link
            className="text-white bg-slate-700 text-center p-3 rounded-lg uppercase hover:opacity-95"
            to={`mailto:${landlord.email}?subject=Regarding ${listingData.name}&body=${message}`}
          >
            Send message
          </Link>
        </div>
      )}
    </>
  );
}
