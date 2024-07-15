import React from "react";
import "./index.css";
import navbarShape1 from "../../assets/navbar_shape1.png";
import navbarShape2 from "../../assets/navbar_shape2.png";
import navbarShape3 from "../../assets/navbar_shape3.png";

function Header() {
  return (
    <div className="home-header">
      <img src={navbarShape1} alt="home-shape1" className="home-shape1" />
      <img src={navbarShape2} alt="home-shape2" className="home-shape2" />
      <img src={navbarShape3} alt="home-shape3" className="home-shape3" />
      <h3 className="home-header-heading">Jobfinder</h3>
      <div className="home-login-registeration">
        <button className="home-button1">Login</button>
        <button className="home-button2">Register</button>
      </div>
    </div>
  );
}

export default Header;
