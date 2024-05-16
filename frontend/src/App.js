import "./App.css";
// pages & components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Journey from "./pages/Journey";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import OccasionMeals from "./pages/OccasionMeals";
import AddMeal from "./pages/AddMeal";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/home" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/occasionMeals" element={<OccasionMeals />} />
        <Route path="/addMeal" element={<AddMeal />} />
      </Routes>
    </Router>
  )
};

export default App;
