import { useSelector } from "react-redux";
import { useEffect } from "react";
import {Link} from  'react-router-dom'

export const ErrorPage = () => {

  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  

  

  // Change body theme
  useEffect(() => {
    document.body.style.background = theme ? "#F2E5BF" : "#31363f";
  }, [theme]);
  return (
    <div>
      <h1
        className={
          theme ? "text-black text-center mt-5" : "text-white text-center mt-5"
        }
      >
        "Oops! The page you're looking for isn't here."
        <Link className="text-decoration-none text-white" to={"/"}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              height={100}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </div>
        </Link>
      </h1>
    </div>
  );
};
