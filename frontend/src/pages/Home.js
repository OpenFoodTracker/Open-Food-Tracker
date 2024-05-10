import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeComponent from "../components/HomeComponent";
import Navbar from "../components/Navbar";

const Home = () => {
    console.log("Home");


  return (
    <div>

        <HomeComponent />
        <Navbar />
    </div>
  );
};
 
export default Home;
