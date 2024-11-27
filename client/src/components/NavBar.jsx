import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";

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
      <nav className="flex bg-gradient-to-br from-slate-200 to-slate-700 justify-between rounded-md items-center px-3 py-2 min-w-[calc(100%-20rem)] fixed right-3 left-[17rem] z-20">
        <input type="text" placeholder="Search here..." className="input input-bordered input-warning w-full max-w-xs" />
        <div className="dropdown dropdown-end">
          <div role="button" tabIndex={0} className="bg-transparent w-9 h-9 aspect-square rounded-full border"></div>
          <ul tabIndex={0} className="menu dropdown-content bg-white backdrop-blur-3xl rounded-box w-52 p-2 shadow z-10">
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
      </nav>
    </>
  );
}
