import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import UserLogIn from "./pages/Login";
import Search from "./pages/Suche";
import UserProfil from "./pages/Profile";
import UserStatistic from "./pages/Statistics";
import { useEffect } from "react";

const Homepage = () => {

  useEffect(() => {


  }, []);

  return (
    <div className="App">
      <label>Inside Home</label>
    </div>
  );
}

/*
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/LogIn" element={<UserLogIn />} />
              <Route path="/Statistic" element={<UserStatistic />} />
              <Route path="/Profil" element={<UserProfil />} />
              <Route path="/Suche" element={<Search />} />
              <Route
                path="/Profil/Einstellungen"
                element={<UserEinstellungen />}
              />
            </Routes>
          </div>
        </BrowserRouter>

*/

export default Homepage;
