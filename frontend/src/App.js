import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt from "jsonwebtoken";
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './store/actions/userActions';
import store from "./store/store";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import Dashboard from "./components/Dashboard";
import AddEmployee from "./components/AddEmployee";
import EmployeeDetails from "./components/EmployeeDetails";
import NotFound from "./components/NotFound";

if(localStorage.employeesAppTkn){
  setAuthToken(localStorage.employeesAppTkn);
  const decoded = jwt.decode(localStorage.employeesAppTkn);
  store.dispatch(setCurrentUser(decoded))
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/admin" component={AdminDashboard} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/employees/add" component={AddEmployee} />
            <Route exact path="/employees/:id" component={EmployeeDetails} />
            <Route component={NotFound} />
          </Switch>
         </div>
        <Footer/>
      </Router>
    </Provider>
  );
}

export default App;
