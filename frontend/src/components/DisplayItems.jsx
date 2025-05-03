import React from 'react'
import { useItemStore } from '../store/items'
import { useAuthStore } from '../store/userInfo';



const DisplayItems = () => {
  const {items, deleteItem} = useItemStore();
  const {token} = useAuthStore();


  const handleDelete = async (itemId) =>{
    const {message} = await deleteItem(itemId,token);
    if (!message) {
      alert(message);
    }

  }

  if (!items || items.length === 0) return <p>No items yet.</p>;
  return (
    <div>
      {items.map((item) => (
        <div key={item._id}>
          <p>{item.item}</p>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default DisplayItems