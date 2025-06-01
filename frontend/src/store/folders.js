import { create } from "zustand";
import axios from "axios";

export const useFolderStore = create((set) => ({
  folders: [],

  createFolder: async (foldername, token) => {
    if (!foldername) {
      return { success: false, message: "Please fill in the fields" };
    }

    try {
      const res = await axios.post(
        '/api/folders',
        { name: foldername },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { data } = res;

      if (!data) {
        return { success: false, message: "Failed to create folder" };
      }

      set((state) => ({
        folders: [...state.folders, data.data],
      }));

      return { success: true, message: "Folder created successfully" };
    } catch (error) {
      console.error("Error creating folder:", error);
      return { success: false, message: "Error creating folder" };
    }
  },

  fetchFolders: async (token) => {
    try {
      const res = await axios.get('/api/folders', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;

      set({ folders: data.data });
    } catch (error) {
      console.error(`Error fetching folders: ${error.message}`);
    }
  },

  deleteFolders: async (folderId, token) => {
    try {
      const res = await axios.delete(`/api/folders/${folderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        set((state) => ({
          folders: state.folders.filter((folder) => folder._id !== folderId),
        }));
      }

      return res.data;
    } catch (error) {
      console.error("Error deleting folder:", error);
      return { success: false, message: "Error deleting folder" };
    }
  },

  renameFolder: async (folderId, namePayload, token) => {
    try {
      const res = await axios.put(
        `/api/folders/${folderId}`,
        namePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        const updatedFolder = res.data.data;

        set((state) => ({
          folders: state.folders.map((folder) =>
            folder._id === folderId ? updatedFolder : folder
          ),
        }));

        return { success: true, message: "Folder renamed successfully" };
      }

      return { success: false, message: "Rename failed" };
    } catch (error) {
      console.error("Error renaming folder:", error);
      return { success: false, message: "Error renaming folder" };
    }
  },
}));



 


