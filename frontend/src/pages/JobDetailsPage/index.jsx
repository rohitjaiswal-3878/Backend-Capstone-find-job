import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobDetailsById } from "../../apis/job";
import { useParams } from "react";
import Header from "../../components/Header";
import "./index.css";
import moneyIcon from "../../assets/money_icon.png";

function JobDetailsPage() {
  // let { id } = useParams();
  const navigate = useNavigate();

  const [jobDetails, setJobDetails] = useState({
    _id: { $oid: "668fa6965d9fe80dfae0143e" },
    name: "Google",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCU383wdXdALpZtQtXaVR9dMxlIWCAxXnkmw&s",
    position: "Front End developer",
    salary: "35000",
    jobType: "Full Time",
    remote: false,
    description: "crzy",
    about:
      "We provide technology-based services to help businesses and organizations achieve their goals. We offer a wide range of services, including software development, system integration, network and security services, cloud computing, and data analytics. Our primary focus is on leveraging technology to streamline business processes, improve productivity, and enhance overall efficiency.",
    skills: ["html", "css", "js", "php", "jqoery"],
    information:
      "We are looking for a responsible PHP/WordPress/Laravel/Shopify Developer. He/She will be liable for managing services and therefore the interchange of knowledge between the server and the users. The candidate's primary focus is going to be the event of all server-side logic, definition, and maintenance of the central database and ensuring high performance and responsiveness to requests from the front end.",
    location: "mumbai",
    userId: { $oid: "668e36174470421cc3966790" },
    __v: "0",
  });

  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    isAllowedToEdit();
    // fetchJobDetailsById();
  }, []);

  const fetchJobDetailsById = async () => {
    if (!id) return;
    const response = await getJobDetailsById(id);
    setJobDetails(response.data);
  };

  const isAllowedToEdit = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsEditable(true);
    }
  };
  return (
    <>
      <div className="job-details-container">
        <Header />
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
              <p className="job-details-2-position">{jobDetails.position}</p>
              <p className="job-details-2-location">{jobDetails.location}</p>
            </div>

            <button
              onClick={() => {
                navigate("/job-post", {
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
            <h2 style={{ marginBottom: "15px" }}>About the job/internship</h2>
            <p>{jobDetails.information}</p>
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
      </div>
    </>
  );
}

export default JobDetailsPage;
