import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <header>
      <ul className="nav nav-tabs text-center">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/posts">
            Posts
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default MainNavigation;
