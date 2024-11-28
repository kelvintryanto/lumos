import axios from "axios";
import { useEffect, useState } from "react";

export default function LatestJournal({ base_url }) {
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

  useEffect(() => {
    fetchLatestJournal();
  }, []);

  return (
    <>
      {/* latest Journal */}

      <div className="flex flex-col space-y-3 pt-3 w-1/5 fixed right-3 pr-2 top-20 min-h-[calc(100vh-18rem)] overflow-y-scroll bottom-5">
        <div className="text-3xl font-bold self-center">Latest Journal</div>
        {journal ? (
          <>
            <div className="flex flex-col bg-slate-100 p-3 rounded-md text-sm">
              <div className="flex mb-2">Title</div>
              {loading ? <div className="skeleton w-full h-4 rounded-md px-2 py-1"></div> : <div className="w-full h-auto bg-white rounded-md px-2 py-1">{journal.aiTitle}</div>}
            </div>

            <div className="flex flex-col bg-slate-100 p-3 rounded-md text-sm">
              <div className="flex mb-2">Journal</div>
              {loading ? <div className="skeleton w-full h-12 rounded-md px-2 py-1"></div> : <div className="w-full h-auto bg-white rounded-md px-2 py-1">{journal.content}</div>}
            </div>

            <div className="flex flex-col bg-slate-100 p-3 rounded-md text-sm">
              <div className="flex mb-2">Insight</div>
              {loading ? <div className="skeleton w-full h-12 rounded-md px-2 py-1 italic"></div> : <div className="w-full h-auto bg-white rounded-md px-2 py-1 italic">{journal.aiInsight}</div>}
            </div>
            <div className="flex flex-col bg-slate-100 p-3 rounded-md text-sm">
              <div className="flex mb-2">Reflection Question</div>
              {loading ? <div className="skeleton w-full h-12 rounded-md px-2 py-1"></div> : <div className="w-full h-auto bg-white rounded-md px-2 py-1">{journal.aiQuestion}</div>}
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
