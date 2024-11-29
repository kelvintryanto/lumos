import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import SideBar from "../components/SideBar";
import axios from "axios";
import Toastify from "toastify-js";
import ProfileSideBar from "../components/ProfileSideBar";

export default function ChangePassword({ base_url }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

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
            <div className="flex">
              {/* Subside bar */}
              <ProfileSideBar />
              <div className="divider-accent mx-2 w-2"></div>
              <div className="flex bg-slate-500 p-3 mr-3 rounded-md text-slate-200 w-fit z-10">
                <div className="flex flex-col mx-auto">
                  <div className="text-xl mb-3">Change Password</div>
                  <div className="h-1 bg-white rounded-xl mb-4"></div>
                  <div className="flex mb-3">
                    <div className="flex flex-col space-y-3">
                      <label className="input input-bordered flex items-center gap-2 text-slate-600 input-md">
                        Old Password
                        <input type="password" className="grow" onChange="" value="" />
                      </label>
                      <label className="input input-bordered flex items-center gap-2 text-slate-600 input-md">
                        New Password
                        <input type="password" className="grow" onChange="" value="" />
                      </label>
                      <label className="input input-bordered flex items-center gap-2 text-slate-600 input-md">
                        Repeat New Password
                        <input type="password" className="grow" onChange="" value="" />
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="btn btn-outline btn-sm">Update</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
