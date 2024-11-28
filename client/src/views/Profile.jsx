import { useState } from "react";
import Navbar from "../components/NavBar";
import SideBar from "../components/SideBar";

export default function Profile({ base_url }) {
  const [user, setUser] = useState("");

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
            <div className="flex">
              <div className="card card-side bg-base-100 shadow-xl">
                <figure>
                  <img src="/defaultUser.jpg" alt="profile photo" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">New movie is released!</h2>
                  <p>Click the button to watch on Jetflix app.</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Watch</button>
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
