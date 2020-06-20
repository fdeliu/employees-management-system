import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../store/actions/userActions";

const Navbar = ({ user, logoutUser }) => {
  return (
    <nav className="navbar sticky-top navbar-light bg-light shadow mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">
          EMSystem
        </Link>
        <ul className="navbar-nav ml-auto">
          {user ? (
            <li className="nav-item">
              <Link className="nav-link">
                Welcome <strong>{user.username}</strong>
              </Link>
            </li>
          ) : null}

          {user ? (
            <li className="nav-item">
              <Link className="nav-link" onClick={() => logoutUser()}>
                Logout
              </Link>
            </li>
          ) : null}
          {user && user.isAdmin ? (
            <li className="nav-item">
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
