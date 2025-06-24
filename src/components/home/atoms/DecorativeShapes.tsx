import React from "react";

const DecorativeShapes = () => {
  return (
    <div style={{ position: "relative", marginBottom: "164px" }}>
      {/* Line */}
      <svg xmlns="http://www.w3.org/2000/svg" width="770" height="60" viewBox="0 0 895 60" fill="none">
        <path
          d="M1.7417 0V59H443.742M443.742 59V0M443.742 59H893.742V0"
          stroke="#E0E2F0"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      {/* circle left */}
      <svg
        style={{ position: "absolute", top: "-16px", left: "-9px" }}
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="21"
        viewBox="0 0 22 21"
        fill="none"
      >
        <circle cx="11.2417" cy="10.5" r="9.5" stroke="#E0E2F0" strokeWidth="2" />
      </svg>

      {/* circle middle */}
      <svg
        style={{ position: "absolute", top: "-16px", left: "370.5" }}
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="21"
        viewBox="0 0 22 21"
        fill="none"
      >
        <circle cx="11.2417" cy="10.5" r="10.5" fill="#E0E2F0" />
      </svg>

      {/* circle right */}
      <svg
        style={{ position: "absolute", top: "-16px", left: "757.5px" }}
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="21"
        viewBox="0 0 22 21"
        fill="none"
      >
        <circle cx="11.2417" cy="10.5" r="9.5" stroke="#E0E2F0" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default DecorativeShapes;