import { faArrowUpFromGroundWater, faKey, faPerson, faTrashCan, faUser, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function ProfileSideBar() {
  return (
    <>
      <div className="flex flex-col">
        <ul className="menu">
          <li>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} />
              Personal Information
            </Link>
          </li>
          <li>
            <Link to="/update">
              <FontAwesomeIcon icon={faUserEdit} />
              Update Profile
            </Link>
          </li>
          <li>
            <Link to="/changepassword">
              <FontAwesomeIcon icon={faKey} />
              Change Password
            </Link>
          </li>
          <li>
            <Link to="/delete">
              <FontAwesomeIcon icon={faTrashCan} />
              Delete Account
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
