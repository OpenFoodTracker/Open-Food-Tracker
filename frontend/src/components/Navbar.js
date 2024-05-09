import { Link } from "react-router-dom";
import CustomModal from "./Scanner/CustomModal";
import "bulma/css/bulma.css";
import Login from "./LogIn";
import UserLogIn from "../pages/LogIn";
const Navbar = () => {
  return (
    <header>
      <nav className="navbar is-fixed-bottom">
        <div className="container">
          <div className="container notification is-primary">
            <button className="button">
              <Link to="/" element={<home />}>
                Home
              </Link>
            </button>
            <button className="button">
              {" "}
              <Link to="/">Statistik</Link>
            </button>
            <button className="button">
              {" "}
              <Link to="/LogIn">Profil/Login</Link>
            </button>
            <CustomModal />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
