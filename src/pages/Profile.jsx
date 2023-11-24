import { useEffect } from "react";
import { useUserSelector } from "../redux/user/userSlice";
import { useForm } from "react-hook-form";
export default function Profile() {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm();
  const { currentUser: user } = useUserSelector();
  console.log("🚀 ~ file: Profile.jsx:11 ~ Profile ~ isDirty:", isDirty);
  const onSubmit = (data) => {
    console.log(data);
  };
  useEffect(() => {
    setValue("username", user.username);
    setValue("email", user.email);
    // You might not want to pre-fill the password field for security reasons
    // setValue("password", user.password);
  }, [setValue, user]);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <img
          src={user.avatar}
          alt={`profile-img-${user.username}`}
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center"
        />
        <input
          type="text"
          placeholder="Username"
          className="rounded-xl border p-3"
          id="username"
          name="username"
          {...register("username", {
            required: true,
          })}
        />
        <input
          type="email"
          placeholder="Email"
          className="rounded-xl border p-3"
          id="email"
          name="email"
          {...register("email", {
            required: true,
          })}
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded-xl border p-3"
          id="password"
          name="password"
          {...register("password", {
            required: true,
          })}
        />
        <button
          disabled={!isDirty}
          className="bg-slate-700 text-white font-bold uppercase rounded-lg p-3  hover:opacity-70 disabled:opacity-50
          disabled:cursor-not-allowed
          "
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
