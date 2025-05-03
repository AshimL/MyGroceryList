import { create } from "zustand";
import axios from "axios";



export const  useItemStore = create((set) => ({
  items: [],
  
  createItem: async (item, token) =>{
    if (!item) {
      return { success: false, message: "Please fill in the fields" }
    }

    try {
      const res = await axios.post("/api/users", {item},
        {headers: {Authorization: `Bearer ${token}`}}
      );

      const {data} = res;

      if(!data){
        return { success: false, message: "Failed to create Item" };
      }
      set((state) => ({
        items: [...state.items, data.data]
      }));

      return { success: true, message: "Item created successfully" };
      
    } catch (error) {
      console.error("Error creating item:", error);
      return { success: false, message: "Error creating item" };
    }

  },

  fetchItem: async (token) =>{

    try {
      const res = await axios.get("/api/users", {

        headers: { Authorization: `Bearer ${token}`}
      })

      set({items: res.data.data});
      
    } catch (error) {
      console.error("Error fetching items", error);
    }
  },

  deleteItem: async (itemId, token) =>{

    try {
      const res = await axios.delete(`/api/users/${itemId}`, {
        headers: {Authorization: `Bearer ${token}`}
      })

      set((state) => ({
        items: state.items.filter((item) => item._id !== itemId),
      }));

      return { success: true,  message: "Item deleted successfully" };
      
    } catch (error) {
      console.error("Error deleting item:", error);
      return { success: false, message: "Failed to delete item" };
    }
  },

  updateItem: async (itemId, updatedItem, token) =>{

    try {
      const res = await axios.put(`/api/users/${itemId}`,
        {updatedItem},
        {headers: {Authorization: `Bearer ${token}`}}
      )


      set((state) => ({
        items: state.items.map((item) =>
          item._id === itemId ? res.data.data : item
        ),
      }));
      
      return { success: true, message: "Item updated successfully" };
    } catch (error) {
      console.error("Error updating item:", error);
      return { success: false, message: "Failed to update item" };
    }
  }
 
}))

