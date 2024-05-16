import React, { useEffect, useState } from 'react';
import Head from "../components/Head";
import Navbar from "../components/Navbar";
import HomeComponent from "../components/HomeComponent";

const Home = () => {
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

      console.log("Home - UserData: ", storedUserData);
      console.log("Home - Token: ", storedToken);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Head />
      <HomeComponent userData={userData} token={token} />
      <Navbar />
    </div>
  );
};

export default Home;
