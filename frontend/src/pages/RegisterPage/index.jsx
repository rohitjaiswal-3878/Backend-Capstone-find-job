import React from "react";
import Register from "../../components/ProtectedRoutes/Register";

function RegisterPage() {
  return (
    <div style={{ display: "flex" }}>
      <Register />
      <img style={{ maxHeight: "100vh", width: "50vw" }} alt="login cover" />
    </div>
  );
}

export default RegisterPage;
