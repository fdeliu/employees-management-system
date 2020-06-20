import React from "react";
import spinner from '../images/spinner.gif';

const Spinner = () => {
  return (
    <div className="spinner">
        <img src={spinner} alt="loading-spinner"/>
  </div>
  );
};

export default Spinner;
