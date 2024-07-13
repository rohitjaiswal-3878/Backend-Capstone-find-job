import React from "react";
import Register from "../../components/ProtectedRoutes/Register";
import registerBanner from "../../assets/register_banner.png";

function RegisterPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Register />
      <span className="login-banner-text">Your Personal Job Finder</span>
      <img
        style={{ maxHeight: "100vh", width: "50vw", objectFit: "cover" }}
        alt="login cover"
        src={registerBanner}
      />
    </div>
  );
}

export default RegisterPage;
