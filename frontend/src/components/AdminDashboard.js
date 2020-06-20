import React, { useState, useEffect } from "react";
import { addUser, getUsers, deleteUser } from ".././store/actions/userActions";
import { connect } from "react-redux";

const AdminDashboard = ({
  getUsers,
  addUser,
  deleteUser,
  users,
  msg,
  user,
  history
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showError, setShowError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getUsers();
    } else {
      history.push("/");
    }
  }, [user, history, getUsers, msg]);

  const addNewUser = () => {
    if (!checkErrors()) {
      return;
    }

    let isAdmin = role === "admin" ? true : false;
    const newUser = {
      name,
      email,
      password,
      isAdmin
    };
    addUser(newUser);
  };
  const checkErrors = () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      role.trim() === ""
    ) {
      setShowError(true);
      return false;
    } else {
      return true;
    }
  };

  const removeUser = (id, name) => {
    const userChoice = window.confirm(
      `Are you sure you want to delete user ${name}?`
    );
    if (userChoice) {
      deleteUser(id);
    }
  };

  let rowIndex = 1;
  return (
    <div className="container">
      <h2 className="my-3 text-center text-primary">Admin Dashboard</h2>
      <div className="d-flex mb-4">
        <h4 className="text-primary">
          <span className="fa fa-users"></span> Users
        </h4>
        <button
          className="btn btn-outline-primary ml-auto"
          data-toggle="modal"
          data-target="#addUserModal"
        >
          Add User<span className="fa fa-plus-circle px-1"></span>
        </button>
      </div>
      {users.length > 0 ? (
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <th scope="row">{rowIndex++}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Admin" : "Human Resourses"}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeUser(user._id, user.name)}
                  >
                    Delete <span className="fa fa-trash px-1"></span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h4 className="text-center">
          No users to display. Click AddUser to add a new one.
        </h4>
      )}

      {/* add user modal */}
      <div
        className="modal fade"
        id="addUserModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addUserModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModalTitle">
                Add User
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Full Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  {showError && name.trim() === "" ? (
                    <span className="text-danger">Name is required</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  {showError && email.trim() === "" ? (
                    <span className="text-danger">Email is required</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  {showError && password.trim() === "" ? (
                    <span className="text-danger">Password is required</span>
                  ) : null}
                </div>
                <label htmlFor="role">Role:</label>
                <select
                  className="custom-select"
                  id="role"
                  defaultValue="Role"
                  onChange={e => setRole(e.target.value)}
                >
                  <option value="Role" disabled>
                    Role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="hr">Human Resourses</option>
                </select>
                {showError && role.trim() === "" ? (
                  <span className="text-danger">Role is required</span>
                ) : null}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                id="closeModal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={addNewUser}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.auth.users,
  user: state.auth.user
});
export default connect(
  mapStateToProps,
  { getUsers, addUser, deleteUser }
)(AdminDashboard);
