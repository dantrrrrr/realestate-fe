import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  useUserSelector,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export default function SignIn() {
  // Assign hooks
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useUserSelector();

  //function
  // Function to handle form submission

  const onSubmit = async (data) => {
    dispatch(signInStart());
    try {
      const response = await axios.post("/api/auth/signin", data);
      // console.log("🚀 ~ file: SignIn.jsx:32 ~ onSubmit ~ response:", response);

      dispatch(signInSuccess(response.data));
      toast.success(`Welcome ${response.data.username}`);
      reset();
      navigate("/");
    } catch (err) {
      // console.log("🚀 ~ file: SignIn.jsx:29 ~ onSubmit ~ err:", err);

      dispatch(
        signInFailure(err.response.data.message || err.response.statusText)
      );
      // toast.error(err.response.data.message || err.response.statusText);

      toast.error(error || "An error occurred during sign-in");
    }
  };

  return (
    <div className="p-3  max-w-lg mx-auto flex flex-col items-center justify-center h-screen">
      <div className="w-96 p-8 rounded-lg shadow-lg bg-gray-50 ">
        <h1 className="text-3xl text-center font-semibold my-7 text-gray-600">
          Sign In
        </h1>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
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
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your password"
            />
          </div>

          <button
            className="bg-slate-700 text-white p-3 rounded-lg text-lg uppercase hover:opacity-95 hover:scale-105 transition-all disabled:opacity-80 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin border-b-2 rounded-full border-white"></div>
            ) : (
              <span>Sign In</span>
            )}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5 text-xs justify-end ">
          <p> Do not have an account ?</p>
          <Link to="/sign-up">
            <span className="text-blue-700 hover:underline">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
