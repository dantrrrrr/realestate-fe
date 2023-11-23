import React, { useState } from "react";
import axios from "axios"; // Import axios library

function Form() {
  // Initialize state variables for input values
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false); // Add a loading state variable

  // Handle function to update state variables on input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setRemember(checked);
    } else {
      switch (name) {
        case "firstName":
          setFirstName(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "password":
          setPassword(value);
          break;
        default:
          break;
      }
    }
  };

  // Handle function to submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before making the request
    // Make a fake API post request using axios
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        firstName,
        email,
        password,
        remember,
      })
      .then((response) => {
        // Do something with the response
        console.log(response.data);
        setLoading(false); // Set loading to false after getting the response
      })
      .catch((error) => {
        // Do something with the error
        console.error(error);
        setLoading(false); // Set loading to false after getting the error
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="w-96 p-8 rounded-lg shadow-lg bg-purple-50">
        <div className="flex justify-center mb-4">
          <img src="logo.png" alt="Logo" className="w-16 h-16" />
        </div>
        <h1 className="text-2xl font-bold text-center text-purple-700">
          Sign in to your account
        </h1>
        <p className="text-sm text-center text-gray-500">
          Or start your 14-day free trial
        </p>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={remember}
                onChange={handleChange}
                className="w-4 h-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-purple-600 hover:underline">
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            disabled={loading} // Disable the button when loading is true
          >
            {loading ? "Loading..." : "Sign in"} // Change the button text based on loading state
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
