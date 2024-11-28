import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toastify from "toastify-js";

export default function LatestJournal({ base_url, fetchJournal }) {
  const [loading, setLoading] = useState(false);
  const [journal, setJournal] = useState({});

  async function fetchLatestJournal() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/journal/latest`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setJournal(data?.journal);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      setLoading(true);
      console.log(id);
      const { data } = await axios.delete(`${base_url}/journal/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      fetchLatestJournal();
      fetchJournal();

      Toastify({
        text: `Succeed delete ${data.aiTitle}`,
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
      console.log(data);
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
    fetchLatestJournal();
  }, []);

  return (
    <>
      {/* latest Journal */}

      <div className="flex flex-col space-y-3 w-1/5 fixed right-3 pr-2 top-20 min-h-[calc(100vh-18rem)] overflow-y-scroll bottom-5">
        <div className="text-3xl font-bold self-center">Latest Journal</div>
        {journal ? (
          <>
            <div className={`flex flex-col rounded-md text-sm`}>
              {loading ? (
                <div className="skeleton w-full h-12 rounded-md px-2 py-1 italic"></div>
              ) : (
                <div className="flex w-full h-auto rounded-md px-2 py-1 justify-evenly">
                  <div className="flex space-x-5">
                    <Link to={`/journal/read/${journal?.id}`} className="btn btn-success btn-xs">
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                    <Link to={`/journal/update/${journal?.id}`} className="btn btn-warning btn-xs">
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                    <button className="btn btn-error btn-xs" onClick={() => handleDelete(journal?.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className={`flex flex-col ${journal?.mood === "senang" ? "bg-yellow-200" : journal?.mood === "netral" ? "bg-gray-200" : journal?.mood === "sedih" ? "bg-blue-200" : ""} p-3 rounded-md text-sm`}>
              <div className="flex mb-2">Title</div>
              {loading ? <div className="skeleton w-full h-4 rounded-md px-2 py-1"></div> : <div className="w-full h-auto bg-white rounded-md px-2 py-1">{journal.aiTitle}</div>}
            </div>

            <div className={`flex flex-col ${journal?.mood === "senang" ? "bg-yellow-200" : journal?.mood === "netral" ? "bg-gray-200" : journal?.mood === "sedih" ? "bg-blue-200" : ""} p-3 rounded-md text-sm`}>
              <div className="flex mb-2">Journal</div>
              {loading ? <div className="skeleton w-full h-12 rounded-md px-2 py-1"></div> : <div className="w-full h-auto bg-white rounded-md px-2 py-1">{journal.content}</div>}
            </div>

            <div className={`flex flex-col ${journal?.mood === "senang" ? "bg-yellow-200" : journal?.mood === "netral" ? "bg-gray-200" : journal?.mood === "sedih" ? "bg-blue-200" : ""} p-3 rounded-md text-sm`}>
              <div className="flex mb-2">Insight</div>
              {loading ? <div className="skeleton w-full h-12 rounded-md px-2 py-1 italic"></div> : <div className="w-full h-auto bg-white rounded-md px-2 py-1 italic">{journal.aiInsight}</div>}
            </div>
            <div className={`flex flex-col ${journal?.mood === "senang" ? "bg-yellow-200" : journal?.mood === "netral" ? "bg-gray-200" : journal?.mood === "sedih" ? "bg-blue-200" : ""} p-3 rounded-md text-sm`}>
              <div className="flex mb-2">Reflection Question</div>
              {loading ? <div className="skeleton w-full h-12 rounded-md px-2 py-1 italic"></div> : <div className="w-full h-auto bg-white rounded-md px-2 py-1">{journal.aiQuestion}</div>}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">You write journal yet</div>
          </>
        )}
      </div>
    </>
  );
}
