import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../apis/auth";

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
    <div>
      <h1>Create an account</h1>
      <h2>Your personal job finder is here.</h2>
      <input type="text" placeholder="Name" onChange={handleChange} />
      <input type="email" placeholder="Email" onChange={handleChange} />
      <input type="password" placeholder="Password" onChange={handleChange} />
      <input type="number" placeholder="Mobile" onChange={handleChange} />
      <button onClick={handleSubmit}>Create Account</button>
      <p>
        Already have an account?
        <span onClick={() => navigate("/login")}>Sign in</span>
      </p>
    </div>
  );
}

export default Register;
