import React from "react";
import useAuth from "../hooks/UseAuth";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login" state={location.pathname}></Navigate>;
}
