import React, { useEffect, useState } from 'react';
import { useItemStore } from '../store/items';
import { useAuthStore } from '../store/userInfo';

const DisplayItems = () => {
  const { items, deleteItem, fetchItem, updateItem } = useItemStore();
  const { token } = useAuthStore();

  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (token) {
      fetchItem(token);
    }
  }, [token, fetchItem]);

  const handleDelete = async (itemId) => {
    const res = await deleteItem(itemId, token);
    if (!res.success) {
      alert(res.message || "Delete failed");
    }
  };

  const handleUpdate = async (itemId) => {
    if (!newName.trim()) return;

    const res = await updateItem(itemId, { item: newName }, token);
    console.log(res.message);

    setEditingId(null);
    setNewName("");
  };

  if (!items || items.length === 0) return <p>No items yet.</p>;

  return (
    <div>
      {items.map((item) => (
        <div key={item._id}>
          {editingId === item._id ? (
            <>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="New item name"
                autoFocus

                 onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleUpdate(item._id);
                    }
                  }}
              />
              <button onClick={() => handleUpdate(item._id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{item.item}</p>
              <button onClick={() => {
                setEditingId(item._id);
                setNewName(item.item);
              }}>
                Rename
              </button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayItems;
