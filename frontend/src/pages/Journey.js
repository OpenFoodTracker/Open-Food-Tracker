import React, { useEffect, useState } from 'react';
import JourneyComponent from "../components/JourneyComponent";
import Head from "../components/Head";

const Journey = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head />
      <div className="main-content">
        <JourneyComponent token={token} />
      </div>
    </div>
  );
};

export default Journey;
