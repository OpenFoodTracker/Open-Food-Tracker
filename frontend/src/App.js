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
import MealSize from "./pages/MealSize";
import EditProfile from './pages/EditProfile';
import SettingsComponent from './components/Settings/SettingsComponent';
import CreditsComponent from './components/Settings/CreditsComponent';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


const App = () => {

  //const isAuthenticated = localStorage.getItem('userData');

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/home" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/occasionMeals" element={<OccasionMeals />} />
        <Route path="/addMeal" element={<AddMeal />} />
        <Route path="/meal/:id" element={<MealSize />}/>
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/settings" element={<SettingsComponent />} />
        <Route path="/credits" element={<CreditsComponent />} />
      </Routes>
    </Router>
    </ThemeProvider>
  )
};


export default App;
