import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import SideBar from "../components/SideBar";
import axios from "axios";
import Toastify from "toastify-js";
import { useParams } from "react-router-dom";
import { formatRelativeTime } from "../helpers/dateHelpers";

export default function JournalDetail({ base_url }) {
  const [loading, setLoading] = useState(false);
  const [journal, setJournal] = useState({});
  const { id } = useParams();

  async function fetchJournal() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/journal/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setJournal(data.journal);
      console.log(journal);
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
    fetchJournal();
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
          <div className="flex flex-col pt-16 pl-3 items-center">
            {loading ? (
              <>
                <div className="skeleton h-16 w-96 mb-3"></div>
                <div className="skeleton h-4 w-48 mb-3"></div>
                <img className="skeleton min-w-60 min-h-60 rounded-md mb-3" />
                <div className="skeleton flex p-5 mr-3 rounded-md min-w-fit w-1/5 min-h-fit z-30 justify-center">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div className="text-4xl">{journal.aiTitle}</div>
                <div className="mb-3">{journal?.date ? <div className="italic">at {formatRelativeTime(journal?.date)}</div> : ""}</div>
                <img src={journal.imageUrl} alt={journal.aiTitle} className="max-w-md mb-5 rounded-md" />
                <div className={`flex ${journal?.mood === "senang" ? "bg-yellow-200" : journal?.mood === "netral" ? "bg-gray-200" : journal?.mood === "sedih" ? "bg-blue-200" : ""} p-5 mr-3 rounded-md min-w-fit w-1/5 z-30`}>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Your Light</td>
                        <td>{journal.content}</td>
                      </tr>
                      <tr>
                        <td>Mood</td>
                        <td>{journal.mood}</td>
                      </tr>
                      <tr>
                        <td>AI Insight</td>
                        <td>{journal.aiInsight}</td>
                      </tr>
                      <tr>
                        <td>AI Question</td>
                        <td>{journal.aiQuestion}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
