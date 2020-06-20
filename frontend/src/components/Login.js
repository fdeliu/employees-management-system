import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginUser } from ".././store/actions/userActions";

const Login = ({ loginUser, user, errorMessage, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (user) {
      history.push("/dashboard");
    }
  }, [user, history]);

  const checkErrors = () => {
    if (email.trim() === "" || password.trim() === "") {
      setShowError(true);
      return false;
    } else {
      return true;
    }
  };

  const login = e => {
    e.preventDefault();
    if (!checkErrors()) {
      return;
    }
    const loginCredentials = {
      email,
      password
    };

    loginUser(loginCredentials, history);
  };
  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="shadow p-3 my-3 bg-light text-center">
          <i className="fa fa-lock fa-3x my-3 primary"></i>
          <h4 className="pb-2">Login To Manage Employees</h4>
          {errorMessage && (
            <span className="alert alert-danger my-1">{errorMessage}</span>
          )}
          <form className="login-form" onSubmit={login}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {showError && email.trim() === "" ? (
                <span className="text-danger">Email is required</span>
              ) : null}
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {showError && password.trim() === "" ? (
                <span className="text-danger">Password is required</span>
              ) : null}
            </div>

            <button type="submit" className="btn btn-secondary btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errorMessage: state.auth.errorMessage
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
