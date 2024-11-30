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
  const [previewUrl, setPreviewUrl] = useState(null);
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

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(file);
      setPreviewUrl(URL.createObjectURL(file)); // Membuat URL sementara untuk pratinjau
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
                    {previewUrl ? (
                      <div className="relative w-20 aspect-square rounded-md mr-3 flex items-center">
                        <img src={previewUrl} alt="Preview" className="w-full object-cover rounded-md" />
                        {/* Tombol overlay muncul saat hover */}
                        <label htmlFor={`upload`} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white cursor-pointer opacity-0 hover:opacity-100 transition-opacity rounded-md">
                          <i className="fa-solid fa-camera text-lg"></i>
                        </label>
                      </div>
                    ) : (
                      // Tampilkan ikon kamera dan tombol upload jika tidak ada gambar
                      <label htmlFor={`upload`} className="flex items-center justify-center w-20 aspect-square bg-gray-200 rounded-md cursor-pointer mr-3">
                        <div className="flex flex-col items-center text-center">
                          <i className="fa-solid fa-camera text-gray-500 text-lg"></i>
                          <span className="text-gray-500 text-sm">Upload Image</span>
                        </div>
                      </label>
                    )}

                    <textarea className="textarea textarea-warning textarea-sm w-full" placeholder="manusiakan dirimu, kamu juga bisa lelah, Lumos di sini untuk mendukungmu, kamu pasti bisa!" onChange={(e) => setJourney(e.target.value)}></textarea>
                  </div>
                  <div className="w-full justify-end flex mt-3">
                    {/* <label className="btn text-white bg-info btn-info glass btn-xs fa-solid fa-paperclip" htmlFor={`upload`}></label> */}
                    <input type="file" id={`upload`} className="hidden" onChange={handleFileChange} />
                    <button className="btn btn-warning btn-sm">
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
