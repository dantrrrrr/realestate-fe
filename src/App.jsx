import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import routes from "./routes";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import { useUserSelector } from "./redux/user/userSlice";
import NotFound from "./pages/NotFound";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

export default function App() {
  const { currentUser: isAuthenticated } = useUserSelector();

  return (
    <BrowserRouter>
      <Header />
      <Toaster position="center-top" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={isAuthenticated ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/sign-up"
          element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:id" element={<UpdateListing />} />
        </Route>
        <Route path="*" element={<Navigate to="/not-found" />} />
        <Route path="/not-found" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
