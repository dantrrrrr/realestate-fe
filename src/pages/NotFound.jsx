import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  const cardStyle =
    "w-96 h-64 bg-white gap-3 flex flex-col items-center justify-center";
  const textStyle = "text-purple-500 font-bold text-9xl";
  const buttonStyle =
    "bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full";

  // Return the JSX for the component
  return (
    <div className="h-screen flex bg-white items-center justify-center">
      <div className={cardStyle}>
        <div className={textStyle}>404</div>
        <div className="text-purple-500 font-bold text-2xl">
          Opps! Page not found
        </div>
        <div className="text-gray-500 text-sm text-center">
          Sorry, the page you're looking for doesn't exist. If you think
          something is broken, report a problem.
        </div>
        <div className="mt-4 flex space-x-4">
          <Link to="/" className={buttonStyle}>
            Return Home
          </Link>
          <button className={buttonStyle}>Report Problem</button>
        </div>
      </div>
    </div>
  );
} // Define the styles for the card, the 404 text, and the buttons
