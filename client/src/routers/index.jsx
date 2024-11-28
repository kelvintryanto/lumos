import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/Login";
import BaseLayout from "../views/BaseLayout";
import Journal from "../views/Journal";
import Toastify from "toastify-js";
import Register from "../views/Register";
import Profile from "../views/Profile";
import JournalDetail from "../views/JournalDetail";
import UpdateProfile from "../views/UpdateProfile";
import ChangePassword from "../views/ChangePassword";
import DeleteAccount from "../views/DeleteAccount";

const base_url = "http://localhost:3000";

export const router = createBrowserRouter([
  {
    path: "/login",
    loader: () => {
      if (localStorage.access_token) {
        // toast di sini
        Toastify({
          text: "You already logged in",
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
        }).showToast();
        return redirect("/journal");
      }

      return null;
    },
    element: <Login base_url={base_url} />,
  },
  {
    path: "/register",
    element: <Register base_url={base_url} />,
  },
  {
    element: <BaseLayout base_url={base_url} />,
    children: [
      {
        path: "/journal",
        loader: () => {
          if (!localStorage.access_token) {
            // toast di sini
            Toastify({
              text: "Please login first",
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
            }).showToast();
            return redirect("/login");
          }

          return null;
        },
        element: (
          <>
            <Journal base_url={base_url} />
          </>
        ),
      },
      {
        path: "/journal/read/:id",
        loader: () => {
          if (!localStorage.access_token) {
            // toast di sini
            Toastify({
              text: "Please login first",
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
            }).showToast();
            return redirect("/login");
          }

          return null;
        },
        element: (
          <>
            <JournalDetail base_url={base_url} />
          </>
        ),
      },
      {
        path: "/profile",
        loader: () => {
          if (!localStorage.access_token) {
            // toast di sini
            Toastify({
              text: "Please login first",
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
            }).showToast();
            return redirect("/login");
          }

          return null;
        },
        element: (
          <>
            <Profile base_url={base_url} />
          </>
        ),
      },
      {
        path: "/update",
        loader: () => {
          if (!localStorage.access_token) {
            // toast di sini
            Toastify({
              text: "Please login first",
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
            }).showToast();
            return redirect("/login");
          }

          return null;
        },
        element: (
          <>
            <UpdateProfile base_url={base_url} />
          </>
        ),
      },
      {
        path: "/changepassword",
        loader: () => {
          if (!localStorage.access_token) {
            // toast di sini
            Toastify({
              text: "Please login first",
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
            }).showToast();
            return redirect("/login");
          }

          return null;
        },
        element: (
          <>
            <ChangePassword base_url={base_url} />
          </>
        ),
      },
      {
        path: "/delete",
        loader: () => {
          if (!localStorage.access_token) {
            // toast di sini
            Toastify({
              text: "Please login first",
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
            }).showToast();
            return redirect("/login");
          }

          return null;
        },
        element: (
          <>
            <DeleteAccount base_url={base_url} />
          </>
        ),
      },
    ],
  },
]);
