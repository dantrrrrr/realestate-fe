import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserSelector } from "../redux/user/userSlice";
export default function Header() {
  const { currentUser } = useUserSelector();

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center mx-auto p-4 max-w-6xl">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">DanT</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700  hover:underline cursor-pointer">
              Home
            </li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline text-slate-700  hover:underline cursor-pointer">
              About
            </li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <img
                src={currentUser.avatar}
                alt=""
                className="w-7 h-7 rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="hidden sm:inline text-slate-700  hover:underline cursor-pointer">
                Sign in
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
