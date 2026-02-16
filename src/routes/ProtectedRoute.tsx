import { Navigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { $storeAuth } from "../features/Auth_effector";
import React, { type ReactNode } from "react";

export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const isAuth = useUnit($storeAuth);

  if (!isAuth.auth) {
    return <Navigate to="/" replace />;
  }

  return children;
};
