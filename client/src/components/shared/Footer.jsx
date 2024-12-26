import { useSelector } from "react-redux";

export const Footer = () => {

  // Get theme
  const {theme} = useSelector((state)=> state.theme)
  return (
    <div className= {theme ? "w-100 mt-5 text-white bg-warning fixed-bottom" : "w-100 mt-5 text-white bg-black fixed-bottom"} 
    style={{ padding: "24px" }}>
      Copyright &copy; 2024 arjunsaseendran.
    </div>
  );
};
