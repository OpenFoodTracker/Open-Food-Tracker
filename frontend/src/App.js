import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import UserLogIn from "./pages/LogIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/LogIn" element={<UserLogIn />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
