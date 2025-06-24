import axios from "axios";
const BACKEND_URL = "http://10.0.2.2:8000/api/";

// auth can be saved from the login.token (save it in the user or other variable  )

const smokingHabits = async (auth, data = {}) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.post(
      BACKEND_URL.concat("smoking-habits/"),
      data,
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const quittingPlan = async (auth) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.get(
      BACKEND_URL.concat("quitting-plan/"),
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const smokingLogs = async (auth, quantity, mood) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.post(
      BACKEND_URL.concat("smoking-logs/"),
      {cigarettes_smoked: quantity, mood: mood},
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const getUserProgressv2 = async (auth) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.get(
      BACKEND_URL.concat("user-progress/get_progress/"),
      config
    );
    console.log("Success:", response.data);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const getWeeklySmokingLogs = async (auth) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.get(
      BACKEND_URL.concat("user-progress/weekly_moods/"),
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const userProgress = async (auth, bool) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.post(
      BACKEND_URL.concat("user-progress/update_streak/"),
      bool,
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const achievements = async (auth) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.get(
      BACKEND_URL.concat("achievements/"),
      {},
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const badge = async (auth) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.get(
      BACKEND_URL.concat("badge/"),
      {},
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const reminder = async (auth) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.get(
      BACKEND_URL.concat("reminder/"),
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const notification = async (auth) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.get(
      BACKEND_URL.concat("notification/"),
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const motivation = async (auth) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.get(
      BACKEND_URL.concat("motivation/"),
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const dashboard = async (auth) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.get(
      BACKEND_URL.concat("dashboard/"),
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const quittingPlanSchedule = async (auth) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.get(
      BACKEND_URL.concat("quitting-plan/schedule/"),
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const updateProfile = async (user, auth) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.put(
      BACKEND_URL.concat("users/update_profile/"),
      user,
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const viewProfile = async (auth) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.get(
      BACKEND_URL.concat("users/view_profile/"),
      {},
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const getSmokingHabits = async (auth, data = {}) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.get(
      BACKEND_URL.concat("smoking-habits/"),
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const getUserProgress = async (auth) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.get(
      BACKEND_URL.concat("user-progress/"),
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const getSmokingStreak = async (auth) => {
  const config = {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${auth}`
    },
  };
  try {
    const response = await axios.get(
      BACKEND_URL.concat("user-progress/current_streak"),
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

const getTotalCigarettes = async (authToken) => {
  const config = {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  };

  try {
    const response = await axios.get(
      BACKEND_URL.concat("smoking-logs/total_cigarettes/"),
      config
    );
    return response.data;
  } catch (error) {
    return 0;
  }
};

const achievementAndBadges = async (authToken) => {
  const config = {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  };

  try {
    const response = await axios.get(
      BACKEND_URL.concat("achievements_and_badges/"),
      config
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};


export {
  smokingHabits,
  quittingPlan,
  smokingLogs,
  userProgress,
  achievements,
  badge,
  reminder,
  notification,
  motivation,
  dashboard,
  quittingPlanSchedule,
  updateProfile,
  viewProfile,
  getSmokingHabits,
  getUserProgress,
  getUserProgressv2,
  getWeeklySmokingLogs,
  getSmokingStreak,
  getTotalCigarettes,
  achievementAndBadges,
};



