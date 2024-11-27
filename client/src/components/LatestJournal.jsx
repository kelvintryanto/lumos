export default function LatestJournal() {
  return (
    <>
      {/* latest Journal */}
      <div className="flex flex-col space-y-3 pt-3 w-1/5 fixed right-3 top-20 min-h-[calc(100vh-18rem)] overflow-y-auto bottom-5">
        <div className="text-3xl font-bold self-center">Latest Journal</div>

        <div className="flex flex-col bg-slate-100 p-3 rounded-md">
          <div className="flex mb-2">Title</div>
          <div className="w-full h-auto bg-white bg-opacity-80 rounded-md px-2 py-1">Bernadya - Lama Lama</div>
        </div>

        <div className="flex flex-col bg-slate-100 p-3 rounded-md">
          <div className="flex mb-2">Journal</div>
          <div className="w-full h-auto bg-white bg-opacity-80 rounded-md px-2 py-1">Lama-Lama habis tenagaku...</div>
        </div>

        <div className="flex flex-col bg-slate-100 p-3 rounded-md">
          <div className="flex mb-2">Insight</div>
          <div className="w-full h-auto bg-white bg-opacity-80 rounded-md px-2 py-1 italic">Berusaha tetap terjaga Tunggu kamu selesaikan semua kesibukan Dering yang paling kunantikan Akhirnya datang hanya menyapa sebentar Pamit tidur duluan Kumaklumi slalu Kumengerti kamu Punya sibuk lain Tak harus aku, tak slalu aku Lama-lama lelah juga aku Seperti hanya aku yang butuhkan kamu Lama-lama habis tenagaku Bila bukan lagi aku tempat pulang yang kautuju Jangan ulur waktu</div>
        </div>
        <div className="flex flex-col bg-slate-100 p-3 rounded-md">
          <div className="flex mb-2">Reflection Question</div>
          <div className="w-full h-auto bg-white bg-opacity-80 rounded-md px-2 py-1">Apakah kamu sedang lelah? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo enim nobis, sint esse illum, blanditiis beatae nisi eaque voluptatibus unde nihil ducimus? Rerum, porro tempore.</div>
        </div>

        {/* Ai Title */}
      </div>
    </>
  );
}
