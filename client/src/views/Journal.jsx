import { useState } from "react";
import LatestJournal from "../components/LatestJournal";
import Navbar from "../components/NavBar";
import SideBar from "../components/SideBar";
import TimeLine from "../components/TimeLine";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Journal({ base_url }) {
  const [loading, setLoading] = useState(false);
  const [journey, setJourney] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("imageUrl", imageUrl);
      formData.append("journey", journey);
      const response = await axios.post(`${base_url}/journal/create`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      navigate(0);
      setLoading(false);
    }
  }
  return (
    <>
      <div className="relative flex min-w-screen min-h-screen p-1 bg-fixed bg-gradient-to-tr from-[#000000] via-[#f3d07c] to-[#7c75e4]" data-theme="light">
        <div className="absolute inset-0 bg-[url('/lumos.jpg')] opacity-50 bg-cover bg-fixed"></div>
        <div>
          <SideBar />
        </div>
        <div className="flex flex-col w-full pl-64">
          <Navbar />
          <div className="flex pt-16">
            <div className="flex flex-col p-3 space-y-3 w-3/4">
              {/* Content */}
              <div className="card bg-white p-3">
                <div className="mb-2 text-xl font-bold">Light Up Your Story here...</div>
                <form onSubmit={handleSubmit}>
                  <div className="flex w-full">
                    <div className="w-20 aspect-square rounded-md mr-3">
                      <img src="/logo.png" className="rounded-md" alt="" />
                    </div>
                    <textarea className="textarea textarea-warning textarea-sm w-full" placeholder="lama lama lelah juga..." onChange={(e) => setJourney(e.target.value)}></textarea>
                  </div>
                  <div className="w-full justify-between flex mt-3">
                    <label className="btn text-white bg-info btn-info glass btn-xs fa-solid fa-paperclip" htmlFor={`upload`}></label>
                    <input type="file" id={`upload`} className="hidden" onChange={(e) => setImageUrl(e.target.files[0])} />
                    <button className="btn btn-ghost btn-sm">
                      {loading ? (
                        <>
                          <span className="loading loading-spinner"></span> Loading
                        </>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
              <div className="z-20 space-y-3">
                <TimeLine base_url={base_url} />
              </div>
            </div>

            <LatestJournal base_url={base_url} />
          </div>
        </div>
      </div>
    </>
  );
}
