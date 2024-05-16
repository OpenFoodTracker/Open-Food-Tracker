import React, { useEffect, useState } from 'react';
import StatisticComponent from "../components/StatisticComponent";
import Navbar from "../components/Navbar";
import Head from "../components/Head";

const UserStatistic = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const storedUserData = localStorage.getItem('userData');
      const storedToken = localStorage.getItem('token');

      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }

      if (storedToken) {
        setToken(storedToken);
      }

      console.log("Statistics - UserData: ", storedUserData);
      console.log("Statistics - Token: ", storedToken);
    };

    fetchData();
  }, []);
  return (
    <div>
      <Head />
      <StatisticComponent userData={userData} token={token}/>
      <Navbar />
    </div>
  );
};

export default UserStatistic;
