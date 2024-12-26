import { useSelector } from "react-redux"
import { useEffect } from "react";

export const ErrorPage = () => {
  const {theme} = useSelector((state)=> state.theme)

  console.log(theme);
  

  // Change body theme
    useEffect(() => {
     document.body.style.background = theme ? "#F2E5BF" : "#31363f";
    }, [theme]);
  return (
    <div>
      
    </div>
  )
}

