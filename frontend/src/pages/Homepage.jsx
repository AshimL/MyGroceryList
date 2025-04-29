import React, { useEffect } from "react";
import { useAuthStore } from "../store/userInfo";

const HomePage = () => {
  const { username } = useAuthStore();

  return (
    <div>
      <h1>Hi {username}</h1>

      <p>What you want to get today?</p>
      <input name="items" />
    </div>



    
  );
};

export default HomePage;
