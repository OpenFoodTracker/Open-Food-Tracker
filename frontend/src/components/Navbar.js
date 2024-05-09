import { Link } from "react-router-dom";
import CustomModal from "./Scanner/CustomModal";
import "bulma/css/bulma.css";
const Navbar = () => {
  return (
    <header>
      <nav className="navbar is-fixed-bottom">
        <div className="container">
          <div className="container notification is-primary">
            <button className="button">
              <Link to="/">Home</Link>
            </button>
            <button className="button">
              <Link to="/Statistik">Statistik</Link>
            </button>
            <button className="button">
              <Link to="/Profil">Profil</Link>
            </button>
            <button className="button">
              <Link to="/LogIn">Login</Link>
            </button>
            <CustomModal />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
