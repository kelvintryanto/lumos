import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import SideBar from "../components/SideBar";
import axios from "axios";
import Toastify from "toastify-js";
import { formatRelativeTime } from "../helpers/dateHelpers";

export default function Profile({ base_url }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  async function fetchUser() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setUser(data.user);
    } catch (error) {
      console.log(error);

      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ef4444, #f97316)",
          borderRadius: "8px",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="flex min-w-screen min-h-screen p-1 bg-fixed bg-gradient-to-tr from-[#000000] via-[#f3d07c] to-[#7c75e4]" data-theme="light">
        <div className="absolute inset-0 bg-[url('/lumos.jpg')] opacity-10 bg-cover bg-fixed"></div>
        <div>
          <SideBar />
        </div>
        <div className="flex flex-col w-full pl-64">
          <Navbar />
          <div className="flex flex-col pt-16 pl-3">
            <div className="text-4xl mb-3">My Profile</div>
            <div className="flex bg-slate-500 p-3 mr-3 rounded-md text-slate-200 w-fit z-30">
              <figure>
                <img src={`${user.profilePicture ?? "/defaultUser.jpg"}`} className="w-20 aspect-square rounded-full" alt="profile photo" />
              </figure>
              <div className="flex flex-col ml-5">
                <div className="text-xl mb-3">Personal Information</div>
                <div className="h-1 bg-white rounded-xl mb-4"></div>
                <div className="flex mb-3">
                  <div className="flex flex-col">
                    <h4 className="text-md">Username:</h4>
                    <h4 className="text-md">Email:</h4>
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-md ml-16">{user?.username}</h5>
                    <h5 className="text-md ml-16">{user?.email}</h5>
                  </div>
                </div>
                <div className="flex">
                  <h4 className="text-md mr-1">Member since</h4>
                  <h5>{user?.createdAt ? formatRelativeTime(user?.createdAt) : ""}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
