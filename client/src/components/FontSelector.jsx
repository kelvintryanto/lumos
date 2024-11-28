import { faMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

export default function FontSelector() {
  const [font, setFont] = useState(localStorage.getItem("fontStyle") || "Nunito");

  useEffect(() => {
    document.body.style.fontFamily = font;
  }, [font]);

  function handleFontChange(selectedFont) {
    setFont(selectedFont);
    localStorage.setItem("fontStyle", selectedFont);
  }

  return (
    <>
      <div className="dropdown">
        <div role="button" tabIndex={0} className="border rounded-md px-2 py-1 text-white">
          Font Style
        </div>
        <ul tabIndex={0} className="menu dropdown-content bg-white rounded-box w-52 p-2 shadow z-10">
          {["Nunito", "Merriweather", "Open Sans"].map((fontOption) => {
            return (
              <li key={fontOption}>
                <button onClick={() => handleFontChange(fontOption)}>
                  {font === fontOption ? (
                    <span>
                      <FontAwesomeIcon icon={faMarker} />
                    </span>
                  ) : (
                    ""
                  )}
                  {fontOption}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
