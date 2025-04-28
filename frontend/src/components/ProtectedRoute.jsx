import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/userInfo";


const ProtectedRoute = ({ element }) => {
  const { username, token } = useAuthStore();

  if (!username || !token) {
    return <Navigate to="/login" replace />; 
  }

  return element;
};

export default ProtectedRoute;
