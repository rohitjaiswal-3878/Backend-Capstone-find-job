import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

function ProtectedRoutes(props) {
  const navigate = useNavigate();
  const { Component } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/login");
    }
  }, []);

  return isLoggedIn && <Component />;
}

export default ProtectedRoutes;
