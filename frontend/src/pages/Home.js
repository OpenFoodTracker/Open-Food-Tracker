import { useEffect, useState } from "react";
import HomeComponent from "../components/HomeComponent";
import Navbar from "../components/Navbar";
import Head from "../components/Head";  // Stelle sicher, dass 'Header.js' existiert

const Home = () => {
  return (
    <div>
      <Head />
      <HomeComponent />
      <Navbar />
    </div>
  );
};

export default Home;
