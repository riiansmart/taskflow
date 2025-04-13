// Top nav bar, links, logout

import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Custom hook for accessing auth context

const Navbar = () => {
  const { user, logout } = useAuth(); // Get current user and logout function

  return (
    <nav className="navbar">
      <Link to="/dashboard">TaskFlow</Link> {/* Link to dashboard */}
      {user && (
        <>
          <Link to="/profile">Profile</Link> {/* Link to profile page */}
          <button onClick={logout}>Logout</button> {/* Logout button */}
        </>
      )}
    </nav>
  );
};

export default Navbar;