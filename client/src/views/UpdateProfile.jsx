import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import SideBar from "../components/SideBar";
import axios from "axios";
import Toastify from "toastify-js";
import ProfileSideBar from "../components/ProfileSideBar";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile({ base_url }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [user, setUser] = useState({});
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const body = { imageUrl, username };
      const { data } = await axios.put(`${base_url}/user`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      navigate(0);
    }
  }

  useEffect(() => {
    setImageUrl(user.profilePicture);
    setUserName(user.username);
  }, [user]);

  useEffect(() => {
    fetchUser();
    console.log(user);
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
                <figure>
                  <img src={`${user.profilePicture ?? "/defaultUser.jpg"}`} className="w-20 aspect-square rounded-full" alt="profile photo" />
                </figure>
                <div className="flex flex-col ml-5">
                  <div className="text-xl mb-3">Update profile</div>
                  <div className="h-1 bg-white rounded-xl mb-4"></div>
                  <div className="flex mb-3">
                    <div className="flex flex-col space-y-3">
                      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                        <label className="input input-bordered flex items-center gap-2 text-slate-600 input-md">
                          Image Url
                          <input type="text" className="grow" onChange={(e) => setImageUrl(e.target.value)} defaultValue={imageUrl} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 text-slate-600 input-md">
                          User Name
                          <input type="text" className="grow" onChange={(e) => setUserName(e.target.value)} defaultValue={username} />
                        </label>
                        <div className="flex justify-end">
                          <button className="btn btn-outline btn-sm">
                            {loading ? (
                              <>
                                <span className="loading loading-spinner"></span> Loading
                              </>
                            ) : (
                              "Update"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
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
