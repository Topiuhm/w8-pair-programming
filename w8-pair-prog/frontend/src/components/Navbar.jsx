import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Property Listings</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/add-property">Add Property</Link>
        <Link to="/signup">Sign up</Link>
        <Link to="/login">Log in</Link>
      </div>
    </nav>
  );
};

export default Navbar;
