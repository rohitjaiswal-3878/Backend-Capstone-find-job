import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/auth";
import { useEffect } from "react";
import "./index.css";

function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    aggreement: false,
  });

  const handleChange = (e) => {
    if (e.target.name === "aggrement") {
      setFormData({
        ...formData,
        [e.target.name]: !formData.aggreement,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.email ||
      !formData.name ||
      !formData.password ||
      !formData.mobile ||
      !formData.aggreement
    ) {
      alert("Fields can't be empty.");
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        mobile: "",
        aggreement: false,
      });
      const response = await registerUser({ ...formData });

      if (response.name) {
        alert("Registered Successfully!");
      } else if (response) {
        alert(response);
      } else {
        alert("Something Went Wrong!!!");
      }
      if (response) navigate("/login");
    }
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
        name="name"
      />
      <input
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="inputs"
        name="email"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="inputs"
        name="password"
      />
      <input
        type="number"
        placeholder="Mobile"
        onChange={handleChange}
        className="inputs"
        name="mobile"
      />
      <div className="checkbox-container">
        <input
          type="checkbox"
          name="aggreement"
          id="agreementCheck"
          onChange={handleChange}
        />
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
