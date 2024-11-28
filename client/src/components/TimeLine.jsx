import axios from "axios";
import { useEffect, useState } from "react";
import { formatRelativeTime } from "../helpers/dateHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Toastify from "toastify-js";

export default function TimeLine({ base_url }) {
  const [journal, setJournal] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchJournal() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/journal`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setJournal(data.journals);
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
    fetchJournal();
  }, []);

  return (
    <>
      {/* Timeline */}
      {journal ? (
        <>
          {journal.map((journey) => {
            return (
              <>
                <div key={journey.id} className={`flex p-3 rounded-md w-full ${journey?.mood === "senang" ? "bg-yellow-200" : journey?.mood === "netral" ? "bg-gray-200" : journey?.mood === "sedih" ? "bg-blue-200" : ""}`}>
                  <div className="flex w-full flex-col space-y-3">
                    <div className="flex justify-between">
                      <div className="flex space-x-2 items-baseline">
                        <div className="font-bold text-xl">{journey?.aiTitle}</div>
                        {journey?.date ? <div className="italic">at {formatRelativeTime(journey?.date)}</div> : ""}
                      </div>
                      <div className="flex space-x-2">
                        <Link to={`/journal/read/${journey?.id}`} className="btn btn-success btn-xs">
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                        <Link to={`/journal/update/${journey?.id}`} className="btn btn-warning btn-xs">
                          <FontAwesomeIcon icon={faPen} />
                        </Link>
                        <button className="btn btn-error btn-xs" onClick={() => handleDelete(journey?.id)}>
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                    </div>
                    <div className="flex">
                      {journey?.imageUrl ? <img src={journey?.imageUrl} alt="image null" className="w-16 h-16 object-over" /> : ""}
                      <div className="flex flex-col">
                        <div>{journey?.content}</div>
                        <div className="italic">{journey?.aiInsight}</div>
                        <div className="flex justify-between items-center">
                          <div className="font-bold italic">{journey?.aiQuestion}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </>
      ) : (
        <div className="bg-white px-2 py-5 mt-10 rounded-md text-center animate-bounce">Light Up your First Story Above</div>
      )}
    </>
  );
}
