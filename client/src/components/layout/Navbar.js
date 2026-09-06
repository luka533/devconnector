import { FaRegUser } from "react-icons/fa";
import { BsBoxArrowInRight } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authLogoutAsync } from "../../state/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth,
  );

  console.log(user);

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <FaRegUser className="react-icon" />
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a href="#!" onClick={() => dispatch(authLogoutAsync())}>
          <BsBoxArrowInRight className="react-icon" />
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!isLoading && <>{isAuthenticated ? authLinks : guestLinks}</>}
    </nav>
  );
}

export default Navbar;
