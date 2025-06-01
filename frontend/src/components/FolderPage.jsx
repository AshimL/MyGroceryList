import { useNavigate, useParams } from "react-router-dom";
import { useItemStore } from "../store/items";
import { useAuthStore } from "../store/userInfo";
import { useEffect, useState } from "react";
import { useFolderStore } from "../store/folders";

const FolderPage = () => {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const { token } = useAuthStore();
  const { items, fetchItem, createItem, updateItem, deleteItem } = useItemStore();
  const { folders } = useFolderStore();

  const [newItem, setNewItem] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  const folder = folders.find((f) => f._id === folderId);
  const folderName = folder ? folder.name : "Folder";

  useEffect(() => {
    if (token) {
      fetchItem(token, folderId);
    }
  }, [token, folderId]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    const res = await createItem(newItem, token, folderId);
    if (res.success) {
      setNewItem("");
    } else {
      alert(res.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreate(e);
    }
  };

  const handleUpdate = async (itemId) => {
    if (!newName.trim()) return;
    const res = await updateItem(itemId, { item: newName }, token);
    if (res.success) {
      setEditingId(null);
      setNewName("");
    } else {
      alert(res.message);
    }
  };



  const handleDelete = async (itemId) => {
    const res = await deleteItem(itemId, token);
    if (!res.success) {
      alert(res.message);
    }
  };

  const handleAddToList = async (item) => {
  const res = await createItem(item, token, null);
  if (!res.success) {
    alert(res.message || "Failed to add item to list");
  }
  else{
    fetchItem(token,folderId)
  }
};

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{folderName}</h2>

      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="New Item"
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button onClick={handleCreate}>Add Item</button>



      {items.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        items.map((item) => (
          <div key={item._id}>
            {editingId === item._id ? (
              <>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="New name"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleUpdate(item._id);
                    }
                  }}

                />
                <button onClick={() => handleUpdate(item._id)}>Save</button>
                <button onClick={() => {
                  setEditingId(null);
                  setNewName("");
                }}>Cancel</button>
              </>
            ) : (
              <>
                <p>{item.item}</p>
                <button onClick={() => {
                  setEditingId(item._id);
                  setNewName(item.item);
                }}>Rename</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
                 <button onClick={() => handleAddToList(item.item)}>Add to list</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default FolderPage;
