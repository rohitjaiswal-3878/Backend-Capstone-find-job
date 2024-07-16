import React from "react";
import JobPostBanner from "../../assets/jobPost_banner.png";
import "./index.css";

function JobPostPage() {
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
                  name="companyName"
                  placeholder="Enter your company name here"
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
                  name="logoUrl"
                  placeholder="Enter the link"
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
                  name="jobPosition"
                  placeholder="Enter job position"
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
                  name="monthlySalary"
                  placeholder="Enter Amount in rupees"
                />
              </td>
            </tr>
            <tr>
              <td className="job-post-column-name">
                <label htmlFor="jobType">Job Type</label>
              </td>
              <td>
                <select name="jobType" id="jobType" defaultValue={"DEFAULT"}>
                  <option value="DEFAULT" disabled>
                    select
                  </option>
                  <option value="full time">Full time</option>
                  <option value="part time">Part time</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="job-post-column-name">
                <label htmlFor="remote">Remote/Office</label>
              </td>
              <td>
                <select name="remote" id="remote" defaultValue={"DEFAULT"}>
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
                <label htmlFor="location">Location</label>
              </td>
              <td>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter Location"
                />
              </td>
            </tr>
            <tr>
              <td className="job-post-column-name">
                <label htmlFor="jobDescription">Job Description</label>
              </td>
              <td>
                <textarea
                  name="jobDescription"
                  id="jobDescription"
                  placeholder="Type the Job description."
                  rows={3}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td className="job-post-column-name">
                <label htmlFor="aboutCompany">About Company</label>
              </td>
              <td>
                <textarea
                  name="aboutCompany"
                  id="aboutCompany"
                  placeholder="Type about your company."
                  rows={3}
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
                    name="skillsRequired"
                    placeholder="Enter the must have skills."
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
                ></textarea>
              </td>
            </tr>
            <tr>
              <td className="job-post-column-name"></td>
              <td className="job-post-buttons">
                <button className="job-post-clear-btn">Cancel</button>
                <button className="job-post-add-btn">+Add Job</button>
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
