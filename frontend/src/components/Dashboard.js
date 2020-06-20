import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getEmployees } from ".././store/actions/employeeActions";
import EmployeeBoard from "./EmployeeBoard";
import Spinner from "./Spinner";

const Dashboard = ({ getEmployees, employees, user, history, errorMessage, successMessage}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) {
      window.scrollTo(0, 0);
      getEmployees();
    } else {
      history.push("/");
    }
  }, [getEmployees, user, history]);
  if (employees.length > 0) {
    return (
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="strech-items">
            <h3 className="text-primary">Employees</h3>
            <input
              type="text"
              className="form-control"
              style={{ width: "40%" }}
              placeholder="Search by name"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Link to="/employees/add" className="btn btn-outline-primary">
              Add New Employee
            </Link>
          </div>
          {employees
            .filter(emp => {
              if (emp.name) {
                return emp.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              } else return emp;
            })
            .map(employee => (
              <EmployeeBoard employee={employee} key={employee._id} />
            ))}
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

const mapStateToProps = state => {
  return {
    employees: state.employee.employees,
    errorMessage: state.employee.errorMessage,
    successMessage: state.employee.successMessage,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { getEmployees }
)(Dashboard);
