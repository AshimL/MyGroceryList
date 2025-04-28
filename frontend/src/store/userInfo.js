import { create } from "zustand";


export const useAuthStore = create((set) => ({
  username: localStorage.getItem('username') || "",
  token: localStorage.getItem('token') || "",
  userId: localStorage.getItem('userId') || "",

  userRegister: async (userInfo) => {
    if (!userInfo.username || !userInfo.password) {
      return { success: false, message: "Please fill in all fields" }
    }

    try {
      const res = await fetch("api/auth/register", {
        method: "Post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userInfo)
      });

      const data = await res.json();
      console.log(data)

      if (!res.ok) {
        return { success: false, message: data.message || "Login failed" };
      }

      // Save to localStorage and update the store
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('token', data.token);

      set({ username: data.user.username, userId: data.user._id, token: data.token });

      return { success: true, message: "Login Successfull" }

    }
    catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Something went wrong" };
    }
  },

  userLogin: async (userInfo) => {

    if (!userInfo.username || !userInfo.password) {
      return { success: false, message: "Please fill in all fields" }
    }

    try {
      const res = await fetch("api/auth/login", {
        method: "Post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userInfo)
      });

      const data = await res.json();
      console.log(data)

      if (!res.ok) {
        return { success: false, message: data.message || "Login failed" };
      }

      // Save to localStorage and update the store
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('token', data.token);

      set({ username: data.user.username, userId: data.user._id, token: data.token });

      return { success: true, message: "Login Successfull" }

    }
    catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Something went wrong" };
    }
  },

  logout: () => {
    // Remove from localStorage and reset the store
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    set({ username: "", token: "", userId: "" });
  }



}));