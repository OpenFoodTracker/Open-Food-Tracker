import React from 'react';
import { useLocation } from 'react-router-dom';
import JourneyComponent from "../components/JourneyComponent";
import Head from "../components/Head";

const Journey = () => {
  const location = useLocation();
  const token = location.state?.token;

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
