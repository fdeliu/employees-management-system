import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getEmployee,
  deleteEmployee
} from ".././store/actions/employeeActions";
import EditEmployee from "./EditEmployee";

const EmployeeDetails = ({
  match,
  getEmployee,
  deleteEmployee,
  employee,
  history,
  user
}) => {
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (user) {
      getEmployee(match.params.id);
    } else {
      history.push("/");
    }
  }, [getEmployee, user, history, match.params.id]);

  const handleDelete = () => {
    const userChoice = window.confirm(
      `Are you sure you want to delete employee ${employee.name}?`
    );
    if (userChoice) {
      deleteEmployee(match.params.id, history);
    }
  };

  if (!employee) {
    return <h4 className="text-center">Loading employee data...</h4>;
  }
  if (edit) {
    return (
      <EditEmployee
        employee={employee}
        history={history}
        cancelEdit={() => setEdit(false)}
      />
    );
  }
  return (
    <div className="row">
      <div className="col-md-5 mx-auto">
        <div className="strech-items">
          <i
            className="fa fa-arrow-circle-left fa-2x"
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => history.push("/")}
          ></i>
          <h3 className="text-primary text-center">{employee.name}</h3>
        </div>
        <div className="shadow p-3 my-3 bg-light text-center">
          <img
            src={employee.profileImage}
            width="150"
            height="150"
            className="rounded-circle"
            alt={employee.name}
          />

          <div className="employee-details">
            <h5>
              <span>Name: </span>
              {employee.name}
            </h5>
            <h5>
              <span>Email: </span>
              {employee.email}
            </h5>
            <h5>
              <span>Phone: </span>
              {employee.phone}
            </h5>
            <h5>
              <span>Education: </span>
              {employee.education}
            </h5>
            <h5>
              <span>Position: </span>
              {employee.position}
            </h5>
            <h5>
              <span>Started: </span>
              {employee.started}
            </h5>
          </div>
          <div className="strech-items">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    employee: state.employee.employee,
    user: state.auth.user,
    successMessage: state.employee.successMessage
  };
};
export default connect(
  mapStateToProps,
  { getEmployee, deleteEmployee }
)(EmployeeDetails);
