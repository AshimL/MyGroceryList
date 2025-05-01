import React, { useState } from 'react'
import { useItemStore } from '../store/items';
import { useAuthStore } from '../store/userInfo';


const CreateItem = () => {

  const [item, setItem] = useState("");
  const {createItem} = useItemStore();
  const {token}  = useAuthStore()


  const handleClick  = async (e) =>{
    e.preventDefault();
    const {success, message} = await createItem(item,token)

    if (success) {
      alert(message);
      setItem(""); 
    } else {
      alert("Did not work: " + message);
    }
  }

  return (
    <div>
      <input
        name="item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={handleClick}>Save</button>
    </div>
  );
}

export default CreateItem;