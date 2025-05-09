import React, { useEffect } from "react";
import { useAuthStore } from "../store/userInfo";
import CreateItem from "../components/CreateItem";
import DisplayItems from "../components/DisplayItems";
import { useItemStore } from "../store/items";
import CreateFolder from "../components/CreateFolder";


const HomePage = () => {
  const { username, token } = useAuthStore();
  const {fetchItem} = useItemStore()
  // const folderId = "6819f521d094dde8aef6e4ce"
  

  useEffect(() =>{
    if(token){
      fetchItem(token)
    }
  }, [token, fetchItem]);

  return (
    <div>
      <h1>Hi {username}</h1>
      <p>What you want to get today?</p>

      <CreateItem />
      <DisplayItems />
      <CreateFolder />
      
    </div>
    
  );
};

export default HomePage;


