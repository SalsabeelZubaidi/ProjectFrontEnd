import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [smokingHabits, setSmokingHabits] = useState(null);
  const [mood, setMood] = useState(null);
  const [userProgress, setUserProgress] = useState();
  const [streak, setStreak] = useState();
  const [weeklySmokingMood, setWeeklySmokingMood] = useState();
  const [totalCigs, setTotalCigs] = useState();
  const [avoidedCigs, setAvoidedCigs] = useState();
  const [levelScore, setLevelScore] = useState({
    level:0, score: 0
  })


  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        selectedPlan,
        setSelectedPlan,
        smokingHabits,
        setSmokingHabits,
        mood,
        setMood,
        userProgress,
        setUserProgress,
        streak,
        setStreak,
        weeklySmokingMood,
        setWeeklySmokingMood,
        totalCigs,
        setTotalCigs,
        avoidedCigs,
        setAvoidedCigs,
        levelScore,
        setLevelScore
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserContext);
