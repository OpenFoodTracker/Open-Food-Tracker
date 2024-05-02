import { Link } from "react-router-dom";
import CustomModal from "./Scanner/CustomModal";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>OFT - Open Food Tracker</h1>
        </Link>
        <CustomModal />
      </div>
    </header>
  );
};

export default Navbar;
