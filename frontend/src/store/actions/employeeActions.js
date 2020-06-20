import axios from "axios";

export const getEmployees = () => async dispatch => {
  try {
    const res = await axios.get("/api/employees", {
      headers: {
        "Content-type": "application/json"
      }
    });
    dispatch({
      type: "GET_EMPLOYEES",
      payload: res.data
    });
  } catch (error) {
    alert(error.response.data.error_msg);
  }
};

export const getEmployee = id => async dispatch => {
  try {
    const res = await axios.get(`/api/employees/${id}`, {
      headers: {
        "Content-type": "application/json"
      }
    });
    dispatch({
      type: "GET_EMPLOYEE",
      payload: res.data
    });
  } catch (error) {
    alert(error.response.data.error_msg);
  }
};

export const addEmployee = (employee, history) => async dispatch => {
  try {
    const res = await axios.post("/api/employees/new", employee, {
      headers: {
        "Content-type": "application/json"
      }
    });
    dispatch({
      type: "ADD_EMPLOYEE",
      payload: res.data.success_msg
    });
    history.push("/");
  } catch (error) {
    alert(error.response.data.error_msg);
  }
};

export const deleteEmployee = (id, history) => async dispatch => {
  try {
    await axios.delete(`/api/employees/delete/${id}`, {
      headers: {
        "Content-type": "application/json"
      }
    });
    dispatch({
      type: "DELETE_EMPLOYEE",
      payload: id
    });
    history.push("/");
  } catch (error) {
    alert(error.response.data.error_msg);
  }
};

export const editEmployee = (id, employee, history) => async dispatch => {
  try {
    const res = await axios.put(`/api/employees/edit/${id}`, employee, {
      headers: {
        "Content-type": "application/json"
      }
    });
    dispatch({
      type: "EDIT_EMPLOYEE",
      payload: res.data.success_msg
    });

    history.push("/");
  } catch (error) {
    alert(error.response.data.error_msg);
  }
};
