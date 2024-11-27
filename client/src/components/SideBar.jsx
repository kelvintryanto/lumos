import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSignOut } from "@fortawesome/free-solid-svg-icons";
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
        <div className="flex text-center">
          <img src="/logo.png" alt="Lumos" className="w-12" />
          <div className="flex flex-col items-start justify-center">
            <h1 className="font-bold text-xl">LUMOS</h1>
            <h2 className="text-xs">Light Up My Own Story</h2>
          </div>
        </div>
        <hr className="my-5" />
        {/* Menu */}
        <ul>
          {/* Cuisines */}
          <li className="hover:bg-white hover:bg-opacity-50 rounded-xl p-2 pl-5 mb-2 z-20">
            <Link to="/" className="flex items-center">
              <FontAwesomeIcon icon={faPen} className="mr-2" />
              Journal
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <hr className="my-3" />
        <button className="flex items-center w-full ml-2" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOut} className="mr-2" />
          Logout
        </button>
      </div>
    </aside>
  );
}
