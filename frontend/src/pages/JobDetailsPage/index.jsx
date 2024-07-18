import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobDetailsById } from "../../apis/job";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import "./index.css";
import moneyIcon from "../../assets/money_icon.png";
import { jwtDecode } from "jwt-decode";

function JobDetailsPage() {
  let { id } = useParams();

  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [jobDetails, setJobDetails] = useState();

  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    fetchJobDetailsById();
  }, []);

  const fetchJobDetailsById = async () => {
    if (!id) return;
    const response = await getJobDetailsById(id);

    if (!response) {
      alert("Something Went Wrong!!!");
    } else {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      if (decoded._id === response.userId) {
        setIsEditable(true);
      }
      setJobDetails(response);
    }
  };

  return (
    <>
      <div className="job-details-container">
        <Header token={token} setToken={setToken} />
        {jobDetails && (
          <>
            <div className="job-details-heading">
              <p>
                {jobDetails?.position} at {jobDetails.name}
              </p>
            </div>
            <div className="job-details-body">
              <div className="job-details-1">
                <div>
                  <p>{jobDetails.jobType}</p>
                </div>
                <div>
                  <img src={jobDetails.logo} alt="company logo" />
                  <p>{jobDetails.name}</p>
                </div>
              </div>
              <div className="job-details-2">
                <div>
                  <p className="job-details-2-position">
                    {jobDetails.position}
                  </p>
                  <p className="job-details-2-location">
                    {jobDetails.location}
                  </p>
                </div>

                {isEditable && (
                  <button
                    onClick={() => {
                      navigate("/job-update", {
                        state: {
                          id: jobDetails._id,
                          jobDetails,
                          edit: true,
                        },
                      });
                    }}
                  >
                    Edit Job
                  </button>
                )}
              </div>
              <div className="job-details-3">
                <p className="job-details-3-heading">
                  <img src={moneyIcon} alt="" />
                  Stipend
                </p>
                <p>Rs {jobDetails.salary}/month</p>
              </div>
              <div style={{ margin: "30px 0px 30px 0px" }}>
                <h2 style={{ marginBottom: "15px" }}>About company</h2>
                <p>{jobDetails.about}</p>
              </div>
              <div style={{ margin: "30px 0px 30px 0px" }}>
                <h2 style={{ marginBottom: "15px" }}>
                  About the job/internship
                </h2>
                <p>{jobDetails.description}</p>
              </div>

              <div style={{ margin: "30px 0px 0px 0px" }}>
                <h2 style={{ marginBottom: "15px" }}>Skills required</h2>
                {jobDetails.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      marginRight: "5px",
                      background: "#FFEEEE",
                      padding: "3px 14px",
                      borderRadius: "20px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default JobDetailsPage;
