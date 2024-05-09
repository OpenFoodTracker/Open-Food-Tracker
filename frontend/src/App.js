import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import UserLogIn from "./pages/LogIn";
import UserEinstellungen from "./pages/Einstellungen";
import Search from "./pages/Suche";
import UserProfil from "./pages/Profil";
import UserStatistik from "./pages/Statistik";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/LogIn" element={<UserLogIn />} />
            <Route path="/Statistik" element={<UserStatistik />} />
            <Route path="/Profil" element={<UserProfil />} />
            <Route path="/Suche" element={<Search />} />
            <Route
              path="/Profil/Einstellungen"
              element={<UserEinstellungen />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
