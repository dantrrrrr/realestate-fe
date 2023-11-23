import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import OAuth from "../components/OAuth";
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
const USERNAME_REGEX = /^\w{6,}$/;
export default function SignUp() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/signup", data);
      toast.success(response.data.message);
      reset();
      navigate("/sign-in");
    } catch (err) {
      // console.log("🚀 ~ file: SignUp.jsx:29 ~ onSubmit ~ err:", err);
      setError(
        err.response.data.message
          ? err.response.data.message
          : err.response.statusText
      );

      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto flex flex-col items-center justify-center h-screen">
      <div className="w-96 p-8 rounded-lg shadow-lg bg-gray-50 ">
        <h1 className="text-3xl text-center font-semibold my-7 text-gray-600">
          Sign up
        </h1>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-2">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              {...register("username", {
                require: true,
                pattern: USERNAME_REGEX,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-2">
                {errors.username.type === "required"
                  ? "Username is required"
                  : "Username must be at least 6 characters"}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              {...register("email", { required: true, pattern: EMAIL_REGEX })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2">
                {errors.email.type === "required"
                  ? "Email is required"
                  : "Email is invalid"}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password", {
                required: true,
                pattern: PASSWORD_REGEX,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your password"
            />
            {errors.password && console.log(errors.password)}
            {errors.password && (
              <p className="text-red-500 text-xs mt-2">
                {errors.password.type === "required"
                  ? "Password is required"
                  : "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character"}
              </p>
            )}
          </div>

          <button
            className="bg-slate-700 text-white p-3 rounded-lg text-lg uppercase hover:opacity-95 hover:scale-105 transition-all disabled:opacity-80 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin border-b-2 rounded-full border-white"></div>
            ) : (
              <span>Sign up</span>
            )}
          </button>
          <OAuth/>
        </form>
        <div className="flex gap-2 mt-5 text-xs justify-end ">
          <p>Have an account ?</p>
          <Link to="/sign-in">
            <span className="text-blue-700 hover:underline">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
