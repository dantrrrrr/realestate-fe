import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  updateUserFail,
  useUserSelector,
  updateUserStart,
  updateUserSuccess,
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
  signoutUserStart,
  signoutUserFail,
  signoutUserSuccess,
} from "../redux/user/userSlice";
import { app } from "../firebase/firebase";
import axiosRequest from "../config/axiosRequest";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

export default function Profile() {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm();

  const { currentUser: user, loading } = useUserSelector();

  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [imageUrl, setImageUrl] = useState(user.avatar);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // FUNCTION
  const onSubmit = async (data) => {
    // Filter out the fields that are empty
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== "")
    );
    try {
      dispatch(updateUserStart());

      const res = await axiosRequest.put(
        `/api/user/update/${user._id}`,
        filteredData
      );

      dispatch(updateUserSuccess(res.data));
      toast.success("Profile updated successfully");
      navigate("/");
    } catch (error) {
      console.log("🚀 ~ file: Profile.jsx:55 ~ onSubmit ~ error:", error);
      toast.error(error.response.data.message);
      dispatch(updateUserFail(error.response.data.message));
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setValue("avatar", downloadURL);
          setImageUrl(downloadURL);
        });
      }
    );
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const fileRef = useRef(null);
  const handleDelete = async () => {
    console.log("delete start");
    try {
      dispatch(deleteUserStart());

      const res = await axiosRequest.delete(`/api/user/delete/${user._id}`);
      dispatch(deleteUserSuccess(res.data));
      // console.log(res.data);
      toast.success(res.data);
    } catch (error) {
      toast.error(error.response.data);
      dispatch(deleteUserFail(error.response.data));
      // console.log(error);
    }
  };
  const handleSignout = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await axiosRequest.get("/api/auth/signout");
      console.log("🚀 ~ file: Profile.jsx:117 ~ handleSignout ~ res:", res);
      dispatch(signoutUserSuccess(res.data));
    } catch (error) {
      dispatch(signoutUserFail(error.response.data));
      console.log("🚀 ~ file: Profile.jsx:117 ~ handleSignout ~ error:", error);
    }
  };
  //   allow read;
  // allow write : if
  // request.resource < 2*1024*1024 && request.resource.contentType.matches("image/*")
  const handleShowListings = async () => {
    try {
      const res = await axiosRequest.get(`/api/user/listing/${user._id}`);
      const data = res.data;
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
      toast.error("Error while showing listings", error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto mb-10">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
          name=""
          id=""
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={imageUrl}
          alt={`profile-img-${user.username}`}
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center"
        />
        <p className="text-xs font-semibold self-center">
          {fileUploadError ? (
            <span className="  text-red-700">Error Image Upload</span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className="  text-slate-700">{`Uploading ${filePercent}%`}</span>
          ) : filePercent === 100 ? (
            <span className="  text-green-700">
              Image uploaded successfully
            </span>
          ) : (
            <span></span>
          )}
        </p>{" "}
        <div className="mt-2 flex flex-col gap-y-2 ">
          <label
            htmlFor="password"
            className="capitalize ml-2 text-md font-semibold"
          >
            username
          </label>

          <input
            defaultValue={user.username}
            type="text"
            placeholder="Username"
            className="rounded-xl border p-3"
            id="username"
            name="username"
            {...register("username", {})}
          />
        </div>
        <div className="mt-2 flex flex-col gap-y-2 ">
          <label
            htmlFor="password"
            className="capitalize ml-2 text-md font-semibold"
          >
            email
          </label>
          <input
            defaultValue={user.email}
            type="email"
            placeholder="Email"
            className="rounded-xl border p-3"
            id="email"
            name="email"
            {...register("email", {})}
          />
        </div>
        <div className="mt-2 flex flex-col gap-y-2 ">
          <label
            htmlFor="password"
            className="capitalize ml-2 text-md font-semibold"
          >
            new password
          </label>
          <input
            type="password"
            placeholder="new password"
            className="rounded-xl border p-3"
            id="password"
            name="password"
            {...register("password", {})}
          />
        </div>
        <button
          disabled={!isDirty || loading}
          className="bg-slate-700 text-white font-bold uppercase rounded-lg p-3  hover:opacity-70 disabled:opacity-50
          disabled:cursor-not-allowed
          "
        >
          {loading ? "Loading" : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white text-center p-3 text-md font-bold uppercase rounded-lg hover:opacity-80"
          to="/create-listing"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDelete}>
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignout}>
          Sign out
        </span>
      </div>
      <button onClick={handleShowListings} className="text-green-700 w-full ">
        Show listings
      </button>
      {userListings && <h1 className="font-bold text-2xl text-center my-4">My Listing</h1>}
      <div className="flex flex-wrap gap-2 justify-between mt-5">
        {userListings.length > 0 &&
          userListings.map((listing, index) => (
            <div
              key={index}
              className="flex flex-col border w-[45%] items-center justify-center p-3 rounded-lg shadow-lg"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="w-[100%] rounded-lg object-contain"
                />
              </Link>
              <Link to={`/listing/${listing._id}`} className="mt-2">
                <p className="text-slate-700 font-semibold truncate">
                  {" "}
                  {listing.name}
                </p>
              </Link>
              <div className="flex items-center mt-2 gap-2 ml-auto">
                <button type="button">
                  <MdDeleteForever
                    size={24}
                    className="text-red-800 hover:text-red-600"
                  />
                </button>
                <button type="button">
                  <MdModeEdit
                    size={24}
                    className="text-blue-800 hover:text-blue-600"
                  />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
