import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {

  const handleClick = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  }

  return (
    <nav className="navbar">
      <h1>Property Listings</h1>
      <div className="links">
        <Link to="/">Home</Link>
        {isAuthenticated && (
          <>
            <span>Welcome {JSON.parse(localStorage.getItem("user")).email}</span>
            <Link to="/add-property">Add Property</Link>
            <button onClick={handleClick}>Logout</button>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Log in</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
