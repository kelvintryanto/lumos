import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function Register({ base_url }) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const body = { username, email, password };
      const { data } = await axios.post(`${base_url}/register`, body);
      console.log(data);
      navigate("/login");
      Toastify({
        text: "Succeed Register, please login...",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #10b981, #064e3b)",
          borderRadius: "8px",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
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

  return (
    <>
      <div className="flex justify-center w-screen h-screen p-5 bg-gradient-to-tr from-[#000000] via-[#f3d07c] to-[#7c75e4]" data-theme="light">
        <div className="absolute inset-0 bg-[url('/lumos.jpg')] opacity-10 bg-cover"></div>
        <div className="flex w-3/4 items-center justify-around bg-slate-50 rounded-xl p-10 m-10 bg-opacity-10 z-10">
          <div className="flex items-center">
            <img src="/logo.png" className="w-28 h-28 animate-pulse" alt="" />
            <div className="flex flex-col">
              <h1 className="font-bold text-4xl">LUMOS</h1>
              <h2 className="text-2xl mt-3">Light Up My Own Story</h2>
            </div>
          </div>
          <div className="flex flex-col w-1/3 mr-10">
            <h1 className="text-xl font-bold text-center mb-6">Register Your Account</h1>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input type="text" className="grow" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
                </label>
              </div>
              <div className="mb-4">
                <label className="input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input type="email" className="grow" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </label>
              </div>
              <div className="mb-6">
                <label className="input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                    <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                  </svg>
                  <input type="password" className="grow" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </label>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-500 focus:outline-none focus:shadow-outline">
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span> Loading
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>
            <div className="text-center mt-5">
              Already have account?
              <Link to="/login" className="text-sky-600 ml-1">
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
