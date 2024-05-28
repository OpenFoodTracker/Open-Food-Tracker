import React, { useEffect, useState } from 'react';
import ProfileComponent from "../components/Profile/ProfileComponent";
import Navbar from "../components/Navbar/Navbar";
import Head from "../components/Head/Head";

const UserProfil = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = () => {

      try {
        if (!localStorage) {
          throw new Error('Local Storage ist nicht verfügbar');
        }
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
    } catch (error) {
        console.error('Fehler beim Laden der Benutzerdaten:', error.message);
    }


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
