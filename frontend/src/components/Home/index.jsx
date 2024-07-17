import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { getAllJobPost } from "../../apis/job";
import "./index.css";
import searchIcon from "../../assets/search_icon.png";
import peopleIcon from "../../assets/peoples_icon.png";
import Header from "../Header";

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
  ]);

  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchAllJobs = async () => {
    const filterSkills = skills.join(",");
    const response = await getAllJobPost({ skills: filterSkills, title });
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
      <Header token={token} setToken={setToken} />
      <div className="home-body">
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
          <div className="home-body-select-left">
            <select
              name="remote"
              onChange={handleSkill}
              defaultValue={"DEFAULT"}
            >
              <option disabled value="DEFAULT">
                Skills
              </option>
              {DEFAULT_SKILLS.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            <div className="home-body-selected-skills">
              {skills.map((skill, index) => {
                return (
                  <span className="home-body-selected" key={index}>
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
          </div>
          <div>
            {token && (
              <button
                className="home-body-filter-btn"
                onClick={() => navigate("/job-post")}
              >
                + Add Job
              </button>
            )}
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
            {/* <button onClick={() => navigate("/job-post")} >+ Add Job</button> */}
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
                {data.skills.map((skill, index) => (
                  <span key={index}>{skill}</span>
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
