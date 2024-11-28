import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const fontStyle = localStorage.getItem("fontStyle") || "Nunito"; // Default to Nunito
    document.body.style.fontFamily = fontStyle;
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
