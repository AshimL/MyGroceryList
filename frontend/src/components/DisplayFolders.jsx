import React, { useEffect, useState } from 'react';
import { useFolderStore } from '../store/folders';
import { useAuthStore } from '../store/userInfo';
import { Link } from 'react-router-dom';

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
    const res =   await deleteFolders(folderId, token);
    if(!res.success){
      alert(res.message ||  "Delete failed")
    }
  };

  const handleRename = async (folderId) => {
    if (!newName.trim()) return;

    const res = await renameFolder(folderId, { name: newName }, token);

    if (res.success) {
      setEditingId(null);
      setNewName("");
    } else {
      alert(`${res.message}`);
    }
  };

  return (
    <div>
      {!folders || folders.length === 0 ? (
        <p>No folders yet.</p>
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

                     onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleRename(folder._id);
                    }
                  }}
                  />
                  <button onClick={() => handleRename(folder._id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <Link to={`/folders/${folder._id}`}>
                    <p>{folder.name}</p>
                  </Link>
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
