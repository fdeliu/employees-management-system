import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt from "jsonwebtoken";

export const loginUser = (loginCredentials, history) => async dispatch => {
  try {
    const res = await axios.post("/api/users/login", loginCredentials);
    localStorage.setItem("employeesAppTkn", res.data);
    setAuthToken(res.data);
    const user = jwt.decode(res.data);
    dispatch(setCurrentUser(user));
    history.push("/dashboard");
  } catch (error) {
    alert(error.response.data.error_msg);
  }
};

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get("/api/users/all", {
      headers: {
        "Content-type": "application/json"
      }
    });
    dispatch({
      type: "GET_USERS",
      payload: res.data
    });
  } catch (error) {
    alert(error.response.data.error_msg);
  }
};

export const addUser = newUser => async dispatch => {
  try {
    const res = await axios.post("/api/users/register", newUser, {
      headers: {
        "Content-type": "application/json"
      }
    });
    window.closeModal();
    dispatch({
      type: "ADD_USER",
      payload: {
        newUser: res.data.newUser,
        successMessage: res.data.success_msg
      }
    });
  } catch (error) {
    alert(error.response.data.error_msg);
  }
};

export const deleteUser = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/users/delete/${id}`, {
      headers: {
        "Content-type": "application/json"
      }
    });
    dispatch({
      type: "DELETE_USER",
      payload: {
        id
      }
    });
  } catch (error) {
    alert(error.response.data.error_msg);
  }
};

export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    payload: user
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("employeesAppTkn");
  setAuthToken(false);
  dispatch(setCurrentUser(null));
};
