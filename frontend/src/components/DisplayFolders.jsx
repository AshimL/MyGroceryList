import React, { useEffect, useState } from 'react';
import { useFolderStore } from '../store/folders';
import { useAuthStore } from '../store/userInfo';

const DisplayFolders = () => {
  const { folders, fetchFolders, deleteFolders, renameFolder } = useFolderStore();
  const { token } = useAuthStore();

  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (token) {
      fetchFolders(token);
    }
  }, [token, fetchFolders]);

  const handleDelete = async (folderId) => {
    if (window.confirm("Delete this folder?")) {
      await deleteFolders(folderId, token);
    }
  };

  const handleRename = async (folderId) => {
    if (!newName.trim()) return;

    const res = await renameFolder(folderId, { name: newName }, token);
    console.log(res.message);

    if (res.success) {
      setEditingId(null);
      setNewName("");
    } else {
      alert("Rename failed");
    }
  };

  return (
    <div>
      {!folders || folders.length === 0 ? (
        <p>No folders</p>
      ) : (
        <div>
          <p>Folder list</p>
          {folders.map((folder) => (
            <div key={folder._id}>
              {editingId === folder._id ? (
                <>
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="New name"
                    autoFocus
                  />
                  <button onClick={() => handleRename(folder._id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p>{folder.name}</p>
                  <button
                    onClick={() => {
                      setEditingId(folder._id);
                      setNewName(folder.name);
                    }}
                  >
                    Rename
                  </button>
                  <button onClick={() => handleDelete(folder._id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayFolders;
