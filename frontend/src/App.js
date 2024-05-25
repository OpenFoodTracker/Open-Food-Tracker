import "./App.css";
import './pages/Profile.css';
// pages & components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Journey from "./pages/Journey";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import EditProfile from './pages/EditProfile';
import SettingsComponent from './components/SettingsComponent';


const App = () => {

  //const isAuthenticated = localStorage.getItem('userData');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/home" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/settings" element={<SettingsComponent />} />
      </Routes>
    </Router>
  )
};

export default App;
