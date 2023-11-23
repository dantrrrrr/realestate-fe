// routes.js
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";

const routes = [
  { path: "/", component: Home, exact: true, private: false },
  { path: "/about", component: About, exact: true, private: false },
  { path: "/sign-in", component: SignIn, exact: true, private: false },
  { path: "/sign-up", component: SignUp, exact: true, private: false },
  { path: "/profile", component: Profile, exact: true, private: true },
  // Add more routes as needed
];

export default routes;
