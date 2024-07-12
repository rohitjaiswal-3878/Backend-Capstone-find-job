import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/auth";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      alert("Fields cant be empty!");
    }

    const response = await loginUser(formData.email, formData.password);
    if (response?.headers["auth-token"]) {
      localStorage.setItem("token", response?.headers["auth-token"]);
      navigate("/");
    }
  };
  return (
    <div>
      <h1>Already have an account?</h1>
      <h2>Your personal job finder is here</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={handleFormChange}
        value={formData.email}
        name="email"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handleFormChange}
        value={formData.password}
        name="password"
      />
      <button onClick={handleSubmit}>Sign in</button>
      <p>
        Don&apos;t have an account?
        <span onClick={() => navigate("/register")}>Sign Up</span>
      </p>
    </div>
  );
}

export default LoginPage;
