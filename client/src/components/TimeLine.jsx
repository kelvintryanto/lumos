import axios from "axios";
import { useEffect, useState } from "react";
import { formatRelativeTime } from "../helpers/dateHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    fetchJournal();
  }, []);

  return (
    <>
      {/* Timeline */}
      {journal[0] ? (
        <div className={`flex p-3 rounded-md w-full ${journal[0]?.mood === "senang" ? "bg-yellow-200" : journal[0]?.mood === "netral" ? "bg-gray-200" : journal[0]?.mood === "sedih" ? "bg-blue-200" : ""}`}>
          <div className="flex w-full flex-col space-y-3">
            <div className="flex justify-between">
              <div className="flex space-x-2 items-baseline">
                <div className="font-bold text-xl">{journal[0]?.aiTitle}</div>
                {journal[0]?.date ? <div className="italic">at {formatRelativeTime(journal[0]?.date)}</div> : ""}
              </div>
              <div className="flex space-x-2">
                <Link to="/journal/read/:id" className="btn btn-success btn-xs">
                  <FontAwesomeIcon icon={faEye} />
                </Link>
                <Link to="/journal/update/:id" className="btn btn-warning btn-xs">
                  <FontAwesomeIcon icon={faPen} />
                </Link>
                <button className="btn text-slate-600 bg-error btn-error glass btn-xs tooltip" data-tip="delete">
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </div>
            <div className="flex">
              {journal[0]?.imageUrl ? <img src={journal[0]?.imageUrl} alt="image null" className="w-16 h-16 object-over" /> : ""}
              <div className="flex flex-col">
                <div>{journal[0]?.content}</div>
                <div className="italic">{journal[0]?.aiInsight}</div>
                <div className="flex justify-between items-center">
                  <div className="font-bold italic">{journal[0]?.aiQuestion}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white px-2 py-5 mt-10 rounded-md text-center animate-bounce">Light Up your First Story Above</div>
      )}
    </>
  );
}
