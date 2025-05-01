import React from 'react'
import { useItemStore } from '../store/items'


const DisplayItems = () => {
  const {items} = useItemStore();

  if (!items || items.length === 0) return <p>No items yet.</p>;

  return (
    <div>
      {items.map((item) => (
        <p key={item._id}> {item.item}</p>
      ))}
    </div>
  )
}

export default DisplayItems