import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { GoogleLogin } from "@react-oauth/google";

export default function Login({ base_url }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const body = { email, password };
      const { data } = await axios.post(`${base_url}/login`, body);
      localStorage.setItem("access_token", data.access_token);
      navigate("/journal");
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

  async function googleLogin(codeResponse) {
    try {
      console.log("halo");
      console.log(codeResponse);
      const { data } = await axios.post(`${base_url}/google-login`, null, {
        headers: {
          token: codeResponse.credential,
        },
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
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
    }
  }

  return (
    <>
      <div className="flex justify-center w-screen h-screen p-5 bg-gradient-to-tr from-[#000000] via-[#f3d07c] to-[#7c75e4]" data-theme="light">
        <div className="absolute inset-0 bg-[url('/lumos.jpg')] opacity-10 bg-cover"></div>
        <div className="flex w-3/4 items-center justify-around bg-slate-50 rounded-xl p-10 m-10 bg-opacity-10 z-10">
          <div className="flex items-center">
            <img src="/logo.png" className="w-28 h-28" alt="" />
            <div className="flex flex-col">
              <h1 className="font-bold text-4xl">LUMOS</h1>
              <h2 className="text-2xl">Light Up My Own Story</h2>
            </div>
          </div>
          <div className="flex flex-col w-1/3 mr-10">
            <h1 className="text-xl font-bold text-center mb-6">Login to Your Account</h1>
            <form onSubmit={handleSubmit}>
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
                  "Login"
                )}
              </button>
            </form>
            <div className="text-center mt-5">
              Not registered?
              <Link to="/register" className="text-sky-600 ml-1">
                Register here
              </Link>
            </div>
            <div className="divider px-10">or</div>
            <div className="mt-6 flex justify-center items-center">
              <GoogleLogin onSuccess={googleLogin} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
