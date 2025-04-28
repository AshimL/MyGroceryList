import React from 'react';
import { useAuthStore } from "../store/userInfo";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const {logout,username} = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () =>{
    logout();
    navigate("/login")
  }

  return (
    <div>
      {username ? <button onClick={handleLogout}>Logout</button>: ""}
      
    </div>
  );
};

export default Navbar;
