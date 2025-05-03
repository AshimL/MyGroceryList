import React, { useState } from 'react'
import { useItemStore } from '../store/items';
import { useAuthStore } from '../store/userInfo';


const CreateItem = () => {

  const [item, setItem] = useState("");
  const {createItem} = useItemStore();
  const {token}  = useAuthStore()


  const handleSubmit  = async (e) =>{
    e.preventDefault();
    const {success, message} = await createItem(item,token)

    if (success) {
      setItem(""); 
    } else {
      alert("Did not work: " + message);
    }
  }


  const handleKeyDown = (e) =>{
    if(e.key === "Enter"){
      console.log("Enter key pressed");
      e.preventDefault();
      handleSubmit(e);
    }

  }

  return (
    <div>
      <input
        name="item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter item"
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default CreateItem;