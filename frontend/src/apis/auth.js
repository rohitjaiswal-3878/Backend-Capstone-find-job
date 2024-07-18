import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const loginUser = async (email, password) => {
  try {
    const reqUrl = `${backendUrl}api/auth/login`;
    const response = await axios.post(reqUrl, { email, password });
    return response;
  } catch (err) {
    // if (err.response.data.message) {
    //   return err.response.data.message;
    // }
    console.log(err);
  }
};

export const registerUser = async ({ email, password, name, mobile }) => {
  try {
    const reqUrl = `${backendUrl}api/auth/register`;
    const response = await axios.post(reqUrl, {
      email,
      password,
      name,
      mobile,
    });
    return response.data;
  } catch (err) {
    if (err.response.data.message) {
      return err.response.data.message;
    }
    console.log(err);
  }
};
