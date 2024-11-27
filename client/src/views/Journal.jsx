import LatestJournal from "../components/LatestJournal";
import Navbar from "../components/NavBar";
import SideBar from "../components/SideBar";

export default function Journal() {
  return (
    <>
      <div className="flex min-w-screen min-h-screen p-1 bg-fixed bg-gradient-to-tr to-blue-300 via-[#ffffff] from-yellow-300" data-theme="light">
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
                <textarea className="textarea textarea-warning textarea-sm" placeholder="Lama Lama habis tenagaku...."></textarea>
                <div className="w-1/5">
                  <input type="file" className="file-input file-input-bordered file-input-xs w-full max-w-xs mt-1" />
                </div>
              </div>

              {/* Timeline */}
              <div className="flex bg-yellow-200 p-3 rounded-md">
                <div className="flex flex-col space-y-3">
                  <div className="font-bold text-xl">Bernadya-Lama Lama</div>
                  <div className="flex">
                    <img src="/logo.png" alt="lumos logo" className="w-16 h-16 object-over" />
                    <div className="flex flex-col">
                      <div>Lama-Lama habis tenagaku...</div>
                      <div className="italic">Berusaha tetap terjaga Tunggu kamu selesaikan semua kesibukan Dering yang paling kunantikan Akhirnya datang hanya menyapa sebentar Pamit tidur duluan Kumaklumi slalu Kumengerti kamu Punya sibuk lain Tak harus aku, tak slalu aku Lama-lama lelah juga aku Seperti hanya aku yang butuhkan kamu Lama-lama habis tenagaku Bila bukan lagi aku tempat pulang yang kautuju Jangan ulur waktu</div>
                      <div className="flex justify-between items-center ">
                        <div className="font-bold italic">Apakah kamu sedang lelah?</div>
                        <div className="italic">Wed, 27/11/2024 10 min ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex bg-gray-200 p-3 rounded-md">
                <div className="flex flex-col space-y-3">
                  <div className="font-bold text-xl">Bernadya-Lama Lama</div>
                  <div className="flex">
                    <img src="/logo.png" alt="lumos logo" className="w-16 h-16 object-over" />
                    <div className="flex flex-col">
                      <div>Lama-Lama habis tenagaku...</div>
                      <div className="italic">Berusaha tetap terjaga Tunggu kamu selesaikan semua kesibukan Dering yang paling kunantikan Akhirnya datang hanya menyapa sebentar Pamit tidur duluan Kumaklumi slalu Kumengerti kamu Punya sibuk lain Tak harus aku, tak slalu aku Lama-lama lelah juga aku Seperti hanya aku yang butuhkan kamu Lama-lama habis tenagaku Bila bukan lagi aku tempat pulang yang kautuju Jangan ulur waktu</div>
                      <div className="flex justify-between items-center ">
                        <div className="font-bold italic">Apakah kamu sedang lelah?</div>
                        <div className="italic">Wed, 27/11/2024 10 min ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex bg-blue-200 p-3 rounded-md">
                <div className="flex flex-col space-y-3">
                  <div className="font-bold text-xl">Bernadya-Lama Lama</div>
                  <div className="flex">
                    <img src="/logo.png" alt="lumos logo" className="w-16 h-16 object-over" />
                    <div className="flex flex-col">
                      <div>Lama-Lama habis tenagaku...</div>
                      <div className="italic">Berusaha tetap terjaga Tunggu kamu selesaikan semua kesibukan Dering yang paling kunantikan Akhirnya datang hanya menyapa sebentar Pamit tidur duluan Kumaklumi slalu Kumengerti kamu Punya sibuk lain Tak harus aku, tak slalu aku Lama-lama lelah juga aku Seperti hanya aku yang butuhkan kamu Lama-lama habis tenagaku Bila bukan lagi aku tempat pulang yang kautuju Jangan ulur waktu</div>
                      <div className="flex justify-between items-center ">
                        <div className="font-bold italic">Apakah kamu sedang lelah?</div>
                        <div className="italic">Wed, 27/11/2024 10 min ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <LatestJournal />
          </div>
        </div>
      </div>
    </>
  );
}
