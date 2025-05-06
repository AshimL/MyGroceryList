import React, { useEffect } from "react";
import { useAuthStore } from "../store/userInfo";
import CreateItem from "../components/CreateItem";
import DisplayItems from "../components/DisplayItems";
import { useItemStore } from "../store/items";


const HomePage = () => {
  const { username, token } = useAuthStore();
  const {fetchItem} = useItemStore()
  

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
      
    </div>
    
  );
};

export default HomePage;


