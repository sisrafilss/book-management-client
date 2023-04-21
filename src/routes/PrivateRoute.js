import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user?.email) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
