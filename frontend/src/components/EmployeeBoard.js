import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const EmployeeBoard = ({ employee, user, history }) => {
  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <div className="shadow p-3 my-3 bg-light employee-board">
      <div className="row align-items-center h-100 ">
        <div className="col-md-3 text-center">
          <img
            src={employee.profileImage}
            width="150"
            height="150"
            className="rounded-circle"
            alt={employee.name}
          />
        </div>
        <div className="col-md-9 strech-items">
          <div>
            <h4 className="text-primary">{employee.name}</h4>
            <p>{employee.position}</p>
            <p>{employee.email}</p>
          </div>
          <div>
            <Link
              to={`/employees/${employee._id}`}
              className="btn btn-outline-secondary mx-5"
            >
              View details <i className="fa fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  null
)(EmployeeBoard);
