import { useNavigate, useParams } from "react-router-dom";
import { useItemStore } from "../store/items";
import { useAuthStore } from "../store/userInfo";
import { useEffect, useState } from "react";
import { useFolderStore } from "../store/folders";

const FolderPage = () => {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const { token } = useAuthStore();
  const { items, fetchItem, createItem } = useItemStore();
  const { folders } = useFolderStore();

  const [newItem, setNewItem] = useState("");
  const folder = folders.find((f) => f._id === folderId);
 const folderName = folder ? folder.name : "Folder";


  useEffect(() => {
    if (token) {
      fetchItem(token, folderId);
    }
  }, [token, folderId]);

  const handleCreate = async () => {
    const res = await createItem(newItem, token, folderId);
    if (res.success) setNewItem("");
    else alert(res.message);
  };




  return (
    <div>

      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{folderName}</h2>
      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="New Item"
      />
      <button onClick={handleCreate}>Add Item</button>


      {items.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        items.map((item) => (
          <p key={item._id}>
            {item.item}
          </p>
        ))


      )}

    </div>
  );
};

export default FolderPage;
