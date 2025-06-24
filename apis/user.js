import axios from "axios";

const BACKEND_URL = "http://10.0.2.2:8000/api/auth/";
const BACKEND_URL2 = "http://10.0.2.2:8000/api/";


const login = async (user) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      BACKEND_URL.concat("login/"),
      user,
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const getUser = async (username) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const response = await axios.get(
      BACKEND_URL.concat("user/?username=", username),
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const logout = (auth) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  return axios.post(BACKEND_URL.concat("logout/"), {}, config);
};

const register = async (user) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      BACKEND_URL.concat("register/"),
      user,
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const forgotPassword = async(user) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      BACKEND_URL.concat("forgot-password/"),
      user,
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }

};

const resetPassword = (user) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return axios.post(BACKEND_URL.concat("reset-password"), user, config);
};

const checkEmailExists = async (email) => {
  try {
  const response = await axios.post(`${BACKEND_URL2}check-email/`, { email });
  return response.data.email_exists;
  } catch (error) {
    console.error(error);
    return false;
  }
};


export { login, getUser, logout, register, forgotPassword, resetPassword, checkEmailExists };
