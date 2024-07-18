import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getAllJobPost = async () => {
  try {
    const results = await axios.get(`${backendUrl}api/jobs/all`, {
      headers: { "auth-token": localStorage.getItem("token") },
    });
    return results.data;
  } catch (err) {
    console.log(err);
  }
};

const getJobDetailsById = async (id) => {
  try {
    const response = await axios.get(`${backendUrl}api/jobs/get/${id}`, {
      headers: { "auth-token": localStorage.getItem("token") },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const updateJobDetailsById = async (formData, id) => {
  try {
    const response = await axios.patch(
      `${backendUrl}api/jobs/update/${id}`,
      { ...formData },
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const createJobPost = async (formData) => {
  try {
    console.log(formData);
    const response = await axios.post(
      `${backendUrl}api/jobs/create`,
      {
        ...formData,
      },
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

const getSearchJobs = async ({ skills, title }) => {
  try {
    const s = skills.replace(/\s+/g, " ") || "123";

    const response = await axios.all([
      axios.get(`${backendUrl}api/jobs/filter/${s}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }),
      axios.get(`${backendUrl}api/jobs/search/${title ? title : "xyz"}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }),
    ]);
    let data = [];

    response.forEach((res) => {
      res.data.forEach((e) => {
        data.push(e);
      });
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};

export {
  getAllJobPost,
  getJobDetailsById,
  updateJobDetailsById,
  createJobPost,
  getSearchJobs,
};
