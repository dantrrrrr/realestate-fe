import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess, useUserSelector } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useUserSelector();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const data = {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      };

      const response = await axios.post("/api/auth/google", data);

      dispatch(signInSuccess(response.data));
      toast.success("Login with Google successfully");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Could not sign in with Google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="flex bg-red-700 text-white p-3 rounded-lg justify-center items-center hover:opacity-90 transition-all uppercase"
    >
      Continue with Google
    </button>
  );
}
