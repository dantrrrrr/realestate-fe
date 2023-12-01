import { useEffect, useRef, useState } from "react";
import { useUserSelector } from "../redux/user/userSlice";
import { useForm } from "react-hook-form";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase/firebase";

export default function Profile() {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm();

  const { currentUser: user } = useUserSelector();

  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    avatar: user.avatar,
  });
  const onSubmit = (data) => {
    console.log(data);
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
  useEffect(() => {
    setValue("username", user.username);
    setValue("email", user.email);
  }, [setValue, user.email, user.username]);

  //   allow read;
  // allow write : if
  // request.resource < 2*1024*1024 && request.resource.contentType.matches("image/*")

  return (
    <div className="p-3 max-w-lg mx-auto">
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
          src={user.avatar}
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
        </p>
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
