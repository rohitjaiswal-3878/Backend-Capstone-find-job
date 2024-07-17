import React from "react";
import JobPostBanner from "../../assets/jobPost_banner.png";
import "./index.css";
import { useState } from "react";
import { createJobPost } from "../../apis/job";

function JobPostPage() {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    position: "",
    salary: "",
    jobType: "",
    remote: "",
    description: "",
    about: "",
    skills: "",
    information: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddJob = async () => {
    const response = await createJobPost(formData);
    console.log(response);
  };

  return (
    <div className="job-post-container">
      <div className="job-post-form">
        <h1>Add job description</h1>
        <table>
          <tbody>
            <tr>
              <td className="job-post-column-name">
                <label htmlFor="companyName">Company Name</label>
              </td>
              <td>
                <input
                  type="text"
                  id="companyName"
                  name="name"
                  placeholder="Enter your company name here"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td className="job-post-column-name">
                <label htmlFor="logoUrl">Add logo URL</label>
              </td>
              <td>
                <input
                  type="text"
                  id="logoUrl"
                  name="logo"
                  placeholder="Enter the link"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td className="job-post-column-name">
                <label htmlFor="jobPosition">Job position</label>
              </td>
              <td>
                <input
                  type="text"
                  id="jobPosition"
                  name="position"
                  placeholder="Enter job position"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td className="job-post-column-name">
                <label htmlFor="monthlySalary">Monthly salary</label>
              </td>
              <td>
                <input
                  type="number"
                  id="monthlySalary"
                  name="salary"
                  placeholder="Enter Amount in rupees"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td className="job-post-column-name">
                <label htmlFor="jobType">Job Type</label>
              </td>
              <td>
                <select
                  name="jobType"
                  id="jobType"
                  defaultValue={"DEFAULT"}
                  onChange={handleChange}
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
              <td className="job-post-column-name">
                <label htmlFor="remote">Remote/Office</label>
              </td>
              <td>
                <select
                  name="remote"
                  id="remote"
                  defaultValue={"DEFAULT"}
                  onChange={handleChange}
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
              <td className="job-post-column-name">
                <label htmlFor="jobDescription">Job Description</label>
              </td>
              <td>
                <textarea
                  name="description"
                  id="jobDescription"
                  placeholder="Type the Job description."
                  rows={3}
                  onChange={handleChange}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td className="job-post-column-name">
                <label htmlFor="aboutCompany">About Company</label>
              </td>
              <td>
                <textarea
                  name="about"
                  id="aboutCompany"
                  placeholder="Type about your company."
                  rows={3}
                  onChange={handleChange}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td className="job-post-column-name">
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
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="job-post-column-name">
                <label htmlFor="information">Information</label>
              </td>
              <td>
                <textarea
                  name="information"
                  id="information"
                  placeholder="Enter the additional information."
                  rows={2}
                  onChange={handleChange}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td className="job-post-column-name"></td>
              <td className="job-post-buttons">
                <button className="job-post-clear-btn">Cancel</button>
                <button className="job-post-add-btn" onClick={handleAddJob}>
                  +Add Job
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <img src={JobPostBanner} id="job-post-banner" />
    </div>
  );
}

export default JobPostPage;
