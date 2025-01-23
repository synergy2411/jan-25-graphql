import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/auth-context";

function MainNavigation() {
  const context = useContext(AuthContext);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    context.setIsLoggedIn(false);
    context.token = null;
  };
  return (
    <header>
      <div className="row">
        <div className="col-8">
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
            {!context.isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="col-4">
          {context.isLoggedIn && (
            <button className="btn btn-outline-danger" onClick={logoutHandler}>
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default MainNavigation;
