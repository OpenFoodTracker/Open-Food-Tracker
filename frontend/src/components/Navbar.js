import { Link } from "react-router-dom";
import CustomModal from "./Scanner/CustomModal";
import Login from "./LogIn";
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
              {" "}
              <Link to="/">Statistik</Link>
            </button>
            <button className="button">
              {" "}
              <Link to="/">Profil</Link>
            </button>
            <CustomModal />
          </div>
        </div>
      </nav>
      <Login />
    </header>
  );
};

export default Navbar;
