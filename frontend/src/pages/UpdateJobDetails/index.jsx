import React from "react";
import JobPostBanner from "../../assets/jobPost_banner.png";
import "./index.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateJobDetailsById } from "../../apis/job";

function UpdateJobDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: state.jobDetails.name,
    logo: state.jobDetails.logo,
    position: state.jobDetails.position,
    salary: state.jobDetails.salary,
    jobType: state.jobDetails.jobType,
    remote: state.jobDetails.remote ? "yes" : "no",
    description: state.jobDetails.description,
    about: state.jobDetails.about,
    skills: state.jobDetails.skills.toString(),
    information: state.jobDetails.information,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleUpdate = async () => {
    const response = await updateJobDetailsById(formData, state.id);
    if (typeof response === "object") {
      alert("Job Details Updated Successfully!!!");
      navigate("/");
    } else {
      alert("Something Went Wrong!!!");
    }
  };
  return (
    <div className="job-update-container">
      <div className="job-update-form">
        <h1>Update Job Details</h1>
        <table>
          <tbody>
            <tr>
              <td className="job-update-column-name">
                <label htmlFor="companyName">Company Name</label>
              </td>
              <td>
                <input
                  type="text"
                  id="companyName"
                  name="name"
                  placeholder="Enter your company name here"
                  onChange={handleChange}
                  defaultValue={formData.name}
                />
              </td>
            </tr>
            <tr>
              <td className="job-update-column-name">
                <label htmlFor="logoUrl">Add logo URL</label>
              </td>
              <td>
                <input
                  type="text"
                  id="logoUrl"
                  name="logo"
                  placeholder="Enter the link"
                  onChange={handleChange}
                  defaultValue={formData.logo}
                />
              </td>
            </tr>
            <tr>
              <td className="job-update-column-name">
                <label htmlFor="jobPosition">Job position</label>
              </td>
              <td>
                <input
                  type="text"
                  id="jobPosition"
                  name="position"
                  placeholder="Enter job position"
                  onChange={handleChange}
                  defaultValue={formData.position}
                />
              </td>
            </tr>
            <tr>
              <td className="job-update-column-name">
                <label htmlFor="monthlySalary">Monthly salary</label>
              </td>
              <td>
                <input
                  type="number"
                  id="monthlySalary"
                  name="salary"
                  placeholder="Enter Amount in rupees"
                  onChange={handleChange}
                  defaultValue={formData.salary}
                />
              </td>
            </tr>
            <tr>
              <td className="job-update-column-name">
                <label htmlFor="jobType">Job Type</label>
              </td>
              <td>
                <select
                  name="jobType"
                  id="jobType"
                  onChange={handleChange}
                  defaultValue={formData.jobType}
                >
                  <option value="DEFAULT" disabled>
                    select
                  </option>
                  <option value="Full Time">Full time</option>
                  <option value="Part Time">Part time</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="job-update-column-name">
                <label htmlFor="remote">Remote/Office</label>
              </td>
              <td>
                <select
                  name="remote"
                  id="remote"
                  onChange={handleChange}
                  defaultValue={formData.remote}
                >
                  <option value="DEFAULT" disabled>
                    select
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="job-update-column-name">
                <label htmlFor="jobDescription">Job Description</label>
              </td>
              <td>
                <textarea
                  name="description"
                  id="jobDescription"
                  placeholder="Type the Job description."
                  rows={3}
                  onChange={handleChange}
                  defaultValue={formData.description}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td className="job-update-column-name">
                <label htmlFor="aboutCompany">About Company</label>
              </td>
              <td>
                <textarea
                  name="about"
                  id="aboutCompany"
                  placeholder="Type about your company."
                  rows={3}
                  onChange={handleChange}
                  defaultValue={formData.about}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td className="job-update-column-name">
                <label htmlFor="skillsRequired">Skills Required</label>
              </td>
              <td>
                <div>
                  <input
                    type="text"
                    id="skillsRequired"
                    name="skills"
                    placeholder="Enter the must have skills."
                    onChange={handleChange}
                    defaultValue={formData.skills}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="job-update-column-name">
                <label htmlFor="information">Information</label>
              </td>
              <td>
                <textarea
                  name="information"
                  id="information"
                  placeholder="Enter the additional information."
                  rows={2}
                  onChange={handleChange}
                  defaultValue={formData.information}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td className="job-update-column-name"></td>
              <td className="job-update-buttons">
                <button
                  className="job-update-clear-btn"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
                <button className="job-update-add-btn" onClick={handleUpdate}>
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <img src={JobPostBanner} id="job-update-banner" />
    </div>
  );
}

export default UpdateJobDetails;
