import React from "react";
import { useSelector } from "react-redux";

export const Loading = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={theme ? "size-6 text-black" : "size-6 text-white"}
        maxHeight={500}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5h6.75V15H4.5v-4.5ZM3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z"
        />
      </svg>
      <div>
        <span className={theme ? "text-black h1" : "text-white h1"}>
          Loading...
        </span>
      </div>
    </div>
  );
};
