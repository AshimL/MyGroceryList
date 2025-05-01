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
  }
 
}))

