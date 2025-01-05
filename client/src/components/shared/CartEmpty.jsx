import React from "react";
import { useSelector } from "react-redux";

export const CartEmpty = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ minHeight: 450 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={theme ? "size-6 text-black" : "size-6 text-white"}
        height={300}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z"
        />
      </svg>

      <div>
        <span className={theme ? "text-black h1" : "text-white h1"}>
          Your cart is empty!
        </span>
      </div>
    </div>
  );
};
