import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../apis/auth";
import "./index.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.email ||
      !formData.name ||
      !formData.password ||
      !formData.mobile
    ) {
      alert("Fields can't be empty.");
    }

    const response = await registerUser({ ...formData });
    alert(response.message);
  };

  return (
    <div className="container">
      <h1 className="heading1">Create an account</h1>
      <h2 className="heading2">Your personal job finder is here.</h2>
      <input
        type="text"
        placeholder="Name"
        onChange={handleChange}
        className="inputs"
      />
      <input
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="inputs"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="inputs"
      />
      <input
        type="number"
        placeholder="Mobile"
        onChange={handleChange}
        className="inputs"
      />
      <div className="checkbox-container">
        <input type="checkbox" name="agreementCheck" id="agreementCheck" />
        <label htmlFor="agreementCheck">
          By creating an account, I agree to our terms of use and privacy policy
        </label>
      </div>
      <button onClick={handleSubmit} className="create-btn">
        Create Account
      </button>
      <p className="have-account">
        Already have an account?
        <span onClick={() => navigate("/login")}>Sign In</span>
      </p>
    </div>
  );
}

export default Register;
