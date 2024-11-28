import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();

  function handleLogout() {
    try {
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <aside className="flex flex-col justify-between w-64 p-4 shadow-lg rounded-md bg-[#FFFFFF] top-2 left-2 fixed min-h-[calc(100vh-1rem)] overflow-auto" data-theme="light">
      {/* Logo */}
      <div>
        <Link to="/journal" className="flex text-center">
          <img src="/logo.png" alt="Lumos" className="w-12" />
          <div className="flex flex-col items-start justify-center">
            <h1 className="font-bold text-xl">LUMOS</h1>
            <h2 className="text-xs">Connecting Yourself</h2>
          </div>
        </Link>
        <hr className="my-5" />
        {/* Menu */}
        <ul className="menu z-20 p-0">
          {/* Cuisines */}
          <li className="hover:bg-white hover:bg-opacity-50 rounded-xl">
            <Link to="/journal" className="flex items-center">
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              Journal
            </Link>
          </li>
          <li className="hover:bg-white hover:bg-opacity-50 rounded-xl">
            <Link to="/profile" className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              My Profile
            </Link>
          </li>
        </ul>
      </div>
      <ul className="menu">
        <hr className="my-3" />
        <button className="flex w-full" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOut} className="mr-2" />
          Logout
        </button>
      </ul>
    </aside>
  );
}
