import React, { useEffect, useState } from 'react';
import ProfileComponent from "../components/ProfileComponent";
import Navbar from "../components/Navbar";
import Head from "../components/Head";

const UserProfil = () => {
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
        setToken(JSON.parse(storedToken));
      }

      console.log("Profile - UserData: ", storedUserData);
      console.log("Profile - Token: ", storedToken);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Head />
      <ProfileComponent userData={userData} token={token}/>
      <Navbar />
    </div>
  );
};

export default UserProfil;
