import React, { useEffect } from "react";
import { useAuthStore } from "../store/userInfo";
import CreateItem from "../components/CreateItem";
import DisplayItems from "../components/DisplayItems";
import CreateFolder from "../components/CreateFolder";
import DisplayFolders from "../components/DisplayFolders";


const HomePage = () => {
  const { username } = useAuthStore();

  // const folderId = "6819f521d094dde8aef6e4ce"
  

  return (
    <div>
      <h1>Hi {username}</h1>
      <p>What you want to get today?</p>

      <CreateItem />
      <DisplayItems />
    
      <CreateFolder />
      <DisplayFolders />



      
    </div>
    
  );
};

export default HomePage;


