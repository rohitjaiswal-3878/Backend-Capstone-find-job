import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import navbarShape1 from "../../assets/navbar_shape1.png";
import navbarShape2 from "../../assets/navbar_shape2.png";
import navbarShape3 from "../../assets/navbar_shape3.png";
import "./index.css";
import searchIcon from "../../assets/search_icon.png";
import peopleIcon from "../../assets/peoples_icon.png";

function Home() {
  const DEFAULT_SKILLS = ["Wordpres", "react", "nodejs", "express", "mongodb"];
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([
    {
      _id: 1,
      logoURL:
        "https://www.saffiretech.com/wp-content/uploads/2019/02/cropped-SaffireTech-Logo-WhiteBack-1.jpg",
      salary: "10000",
      location: "kathmandu",
      remote: "Remote",
      jobType: "Full Time",
      skills: ["React", "Node", "MongoDB", "Express", "MongoDB"],
      position: "Frontend developer",
    },
    {
      _id: 2,
      logoURL:
        "https://www.saffiretech.com/wp-content/uploads/2019/02/cropped-SaffireTech-Logo-WhiteBack-1.jpg",
      salary: "10000",
      location: "kathmandu",
      remote: "Remote",
      jobType: "Full Time",
      skills: ["React", "Node", "MongoDB", "Express", "MongoDB"],
      position: "Frontend developer",
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
      <div className="home-body">
        {token ? <button onClick={handleLogout}>Logout</button> : ""}
        <div className="home-body-search">
          <img
            src={searchIcon}
            alt="search icon"
            className="home-search-icon"
          />
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Type any job title"
            name="search"
            className="home-search-input"
          />
        </div>
        <div className="home-body-select">
          <div>
            <select
              name="remote"
              onChange={handleSkill}
              defaultValue={"DEFAULT"}
            >
              <option disabled value="DEFAULT">
                Skills
              </option>
              {DEFAULT_SKILLS.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            {skills.map((skill) => {
              return (
                <span className="home-body-selected" key={skill}>
                  {skill}
                  <span
                    onClick={() => removeSkill(skill)}
                    className="home-body-selected-cross"
                  >
                    X
                  </span>
                </span>
              );
            })}
          </div>
          <div>
            <button onClick={fetchAllJobs} className="home-body-filter-btn">
              Apply Filter
            </button>
            <button
              onClick={() => {
                setSkills([]);
                setTitle("");
              }}
              className="home-body-clear-btn"
            >
              Clear
            </button>
            {/* <button onClick={() => navigate("/job-post")}>+ Add Job</button> */}
          </div>
        </div>
      </div>
      {jobs.map((data) => {
        return (
          <div key={data._id} className="home-job">
            <div className="home-job-left">
              <div className="home-job-icon">
                <img src={data.logoURL} alt="logo" />
              </div>
              <div className="home-job-details">
                <p className="home-job-details-heading">{data.position}</p>
                <p className="home-job-details-1">
                  <div>
                    <img src={peopleIcon} alt="people icon" />
                    <span>11 - 50</span>
                  </div>
                  <span>&#8377; {data.salary}</span>
                  <span>{data.location}</span>
                </p>
                <p className="home-job-details-2">
                  <span>{data.remote}</span>
                  <span>{data.jobType}</span>
                </p>
              </div>
            </div>
            <div className="home-job-detail-skills">
              <p>
                {data.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </p>
              <button>View details</button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Home;
