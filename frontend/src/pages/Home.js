import React from 'react';
import { useLocation } from 'react-router-dom';

import HomeComponent from "../components/HomeComponent";
import Navbar from "../components/Navbar";
import Head from "../components/Head";


const Home = () => {
  const location = useLocation();
  const { userData, token, mealsData, recipeData } = location.state || {};


  return (
    <div>
      <Head />
      <HomeComponent userData={userData} token={token} mealsData={mealsData} recipeData={recipeData}/>
      <Navbar />
    </div>
  );
};


export default Home;
