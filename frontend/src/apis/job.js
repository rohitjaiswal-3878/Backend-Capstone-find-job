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

const updateJobDetailsById = async () => {
  return null;
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

export {
  getAllJobPost,
  getJobDetailsById,
  updateJobDetailsById,
  createJobPost,
};
