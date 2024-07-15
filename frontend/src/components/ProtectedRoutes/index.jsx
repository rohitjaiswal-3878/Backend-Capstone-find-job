import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";

function ProtectedRoutes(props) {
  const { Component } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return <div>{isLoggedIn ? <Component /> : <Navigate to="/login" />}</div>;
}

export default ProtectedRoutes;
