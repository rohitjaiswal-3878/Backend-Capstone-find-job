import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import navbarShape1 from "../../assets/navbar_shape1.png";
import navbarShape2 from "../../assets/navbar_shape2.png";
import navbarShape3 from "../../assets/navbar_shape3.png";
import "./index.css";

function Home() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([
    {
      _id: 1,
      logoURL: "",
      salary: "10000",
      location: "kathmandu",
      remote: "Remote",
      jobType: "Full Time",
      skills: ["React", "Node", "MongoDB"],
    },
  ]);

  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState("");
  const [token] = useState(localStorage.getItem("token"));

  const fetchAllJobs = async () => {
    const filterSkills = skills.join(",");
    const response = await getAllJobsPost({ skills: filterSkills, title });
    setJobs(response.data);
  };

  useEffect(() => {
    // fetchAllJobs
  }, []);

  const handleLogout = (e) => {
    localStorage.clear();
    navigate("/register");
  };

  const handleSkill = (e) => {
    const newArr = skills.filter((skill) => skill === e.target.value);
    if (!newArr.length) {
      setSkills([...skills, e.target.value]);
    }
  };

  const removeSkill = (selectedSkill) => {
    const newArr = skills.filter((skill) => skill !== selectedSkill);
    setSkills([...newArr]);
  };
  return (
    <>
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
    </>
  );
}

export default Home;
