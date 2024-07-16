import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/auth";
import { useState } from "react";
import registerBanner from "../../assets/register_banner.png";
import "./index.css";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      alert("Fields cant be empty!");
    } else {
      const response = await loginUser(formData.email, formData.password);
      console.log(response);
      if (typeof response === "string") {
        alert(response);
      } else if (response.headers["auth-token"]) {
        console.log("in");
        localStorage.setItem("token", response?.headers["auth-token"]);
        navigate("/");
      } else {
        alert("Something Went Wrong.");
      }
    }
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-heading1">Already have an account?</h1>
        <h2 className="login-heading2">Your personal job finder is here</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={handleFormChange}
          value={formData.email}
          name="email"
          className="login-inputs"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleFormChange}
          value={formData.password}
          name="password"
          className="login-inputs"
        />
        <button onClick={handleSubmit} className="login-btn">
          Sign in
        </button>
        <p className="login-signup">
          Don&apos;t have an account?
          <span onClick={() => navigate("/register")}>Sign Up</span>
        </p>
      </div>
      <span className="login-banner-text">Your Personal Job Finder</span>
      <img src={registerBanner} alt="login banner" />
    </div>
  );
}

export default LoginPage;
