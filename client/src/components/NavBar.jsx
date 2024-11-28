import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import FontSelector from "./FontSelector";

export default function Navbar() {
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
    <>
      <nav className="flex bg-gradient-to-br from-slate-200 to-slate-700 justify-between rounded-md items-center px-3 py-2 min-w-[calc(100%-20rem)] fixed right-3 left-[17rem] z-30">
        <div className="flex space-x-3">
          <label className="input input-bordered input-sm flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
            </svg>
          </label>
          <FontSelector />
        </div>

        <div className="flex items-center space-x-3">
          <div className="dropdown dropdown-end">
            <div role="button" tabIndex={0} className={`w-9 h-9 aspect-square rounded-full border bg-[url('/defaultUser.jpg')] bg-contain`}></div>
            <ul tabIndex={0} className="menu dropdown-content bg-white rounded-box w-52 p-2 shadow z-10">
              {/* My Profile */}
              <li>
                <Link to="/profile" className="flex items-center">
                  <FontAwesomeIcon icon={faUser} />
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/changepassword" className="flex items-center">
                  <FontAwesomeIcon icon={faKey} />
                  Change Password
                </Link>
              </li>
              <hr />
              <li>
                <a className="flex items-center" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOut} />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
