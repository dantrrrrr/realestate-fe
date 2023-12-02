import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../firebase/firebase";
import axiosRequest from "../config/axiosRequest";
import { useUserSelector } from "../redux/user/userSlice";
const initialFormData = {
  imageUrls: [],
  name: "",
  description: "",
  address: "",
  type: "rent",
  bedrooms: 1,
  bathrooms: 1,
  regularPrice: 50,
  discountPrice: 0,
  offer: false,
  parking: false,
  furnished: false,
  userRef: "",
};
export default function UpdateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ ...initialFormData });

  const [imageUploadFileError, setImageUploadFileError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser: user } = useUserSelector();
  const { id } = useParams();
  useEffect(() => {
    const fetchPageListing = async () => {
      try {
        const res = await axiosRequest.get(`/api/listing/get/${id}`);
        setFormData(res.data);
      } catch (error) {
        console.log(
          "🚀 ~ file: UpdateListing.jsx:45 ~ fetchPageListing ~ error:",
          error
        );
      }
    };
    fetchPageListing();
  }, []);
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, idx) => idx !== index),
    });
  };
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadFileError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadFileError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadFileError("Image upload failed. Please try again.");
          setUploading(false);
        });
    } else {
      setImageUploadFileError("You can only upload up to 6 images.");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);

      const fileName = new Date().getTime() + file.name;

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "text" ||
      e.target.type === "number" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length < 1) {
      return setError("Please upload at least 1 image.");
    }
    if (+formData.regularPrice < +formData.discountPrice) {
      return setError("Discounted price must be lower than regular price.");
    }
    try {
      setLoading(true);
      setError(false);
      const res = await axiosRequest.put(`/api/listing/update/${id}`, {
        ...formData,
        userRef: user._id,
      });
      const data = res.data;

      setFiles([]);
      setFormData({
        ...initialFormData,
      });
      setImageUploadFileError(false);
      setUploading(false);
      setLoading(false);
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(
        "An error occurred while creating the listing. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 flex-1">
          {/* name */}
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="border p-3 rounded-lg"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          {/* description */}
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
            onChange={handleChange}
            value={formData.description}
          />
          {/* address */}
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="border p-3 rounded-lg"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            {/* sale */}
            <div className="flex gap-2">
              <input
                type="checkbox"
                name=""
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            {/* rent */}
            <div className="flex gap-2">
              <input
                type="checkbox"
                name=""
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            {/* parking */}
            <div className="flex gap-2">
              <input
                type="checkbox"
                name=""
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            {/* furnished */}
            <div className="flex gap-2">
              <input
                type="checkbox"
                name=""
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            {/* offer */}
            <div className="flex gap-2">
              <input
                type="checkbox"
                name=""
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            {/* bedrooms */}
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            {/* bathrooms */}
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            {/* regular Price */}

            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                min="50"
                max="10000000"
                id="regularPrice"
                required
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center gap-2">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            {/* discount Price */}
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  className="p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="1000000"
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center gap-2">
                  <p>Discounted price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold text-sm">
            Images:
            <span className="font-normal text-gray-700 ml-2">
              The frist image will be the cover (max 6)
            </span>
          </p>
          {/* upload imaeg */}
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              name=""
              id="images"
              accept="image/*"
              multiple
            />
            <button
              disabled={uploading}
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded hover:shadow-lg disabled:opacity-70 uppercase"
            >
              {uploading ? "Uploading" : " Upload"}
            </button>
          </div>
          {/* upload error */}
          <p className="text-red-600">
            {imageUploadFileError && imageUploadFileError}
          </p>
          {/* image list */}
          <div className="flex flex-wrap">
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between relative p-3  items-center"
                >
                  <img
                    src={url}
                    className="rounded-lg object-cover w-20 h-20"
                    alt={`listing-${index}`}
                  />
                  <button
                    type="button"
                    className=" absolute top-0 right-0 "
                    onClick={() => handleRemoveImage(index)}
                  >
                    <TiDelete
                      size="25"
                      color="red"
                      className=" bg-white w-full  rounded-full hover:scale-125  transition-all "
                    />
                  </button>
                </div>
              ))}
          </div>
          <button
            disabled={loading || uploading}
            className="uppercase text-white bg-slate-600 p-3  rounded-lg hover:opacity-90 disabled:opacity-80"
          >
            {loading ? "Updating..." : "Update Listing"}{" "}
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
