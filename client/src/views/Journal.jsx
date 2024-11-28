import { useState } from "react";
import LatestJournal from "../components/LatestJournal";
import Navbar from "../components/NavBar";
import SideBar from "../components/SideBar";
import TimeLine from "../components/TimeLine";
import axios from "axios";

export default function Journal({ base_url }) {
  const [loading, setLoading] = useState(false);
  const [journal, setJournal] = useState([]);
  const [imageUrl, setImageUrl] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const body = { journal, imageUrl };
      const { data } = await axios.post(`${base_url}/journal`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex min-w-screen min-h-screen p-1 bg-fixed bg-gradient-to-tr from-[#000000] via-[#f3d07c] to-[#7c75e4]" data-theme="light">
        <div className="absolute inset-0 bg-[url('/lumos.jpg')] opacity-10 bg-cover bg-fixed"></div>
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
                  <textarea className="textarea textarea-warning textarea-sm w-full" placeholder="Lama Lama habis tenagaku...." onChange={(e) => setJournal(e.target.value)}></textarea>
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
              <div className="z-20 space-y-5">
                <TimeLine base_url={base_url} />
              </div>
            </div>

            <LatestJournal />
          </div>
        </div>
      </div>
    </>
  );
}
