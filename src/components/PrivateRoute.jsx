import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { token } = useContext(ShopContext);

  // Render logic
  return token ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
