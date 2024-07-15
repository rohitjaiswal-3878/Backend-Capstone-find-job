import axios from "axios";

const backendUrl = import.meta.backendUrl;

const getAllJobPost = async () => {
  try {
    const results = await axios.get(`${backendUrl / api / jobs / all}`);
    return results;
  } catch (err) {
    console.log(err);
  }
};

const getJobDetailsById = async () => {
  return null;
};

const updateJobDetailsById = async () => {
  return null;
};

const createJobPost = async () => {
  return null;
};

export {
  getAllJobPost,
  getJobDetailsById,
  updateJobDetailsById,
  createJobPost,
};
