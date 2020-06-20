import React, { useState, useEffect } from "react";
import axios from "axios";
import { editEmployee } from ".././store/actions/employeeActions";
import { connect } from "react-redux";

const EditEmployee = ({
  user,
  editEmployee,
  history,
  employee,
  cancelEdit,
  errorMessage,
  successMessage
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [profileImage, setProfileImage] = useState(employee.profileImage);
  const [phone, setPhone] = useState(employee.phone);
  const [education, setEducation] = useState(employee.education);
  const [position, setPosition] = useState(employee.position);
  const [started, setStarted] = useState(employee.started);
  const [showError, setShowError] = useState(false);

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose Image");

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  const onChangeFile = e => {
    if (!e.target.files[0]) {
      return;
    }
    if (!e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      alert("File is not an image! Please choose an image.");
      return;
    }
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const upload = e => {
    e.preventDefault();
    if (!file) {
      alert("You must choose an image first.");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_cloudinary_preset_here");

    axios
      .post("your_cloudinary_url_here", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        setIsUploading(false);
        setProfileImage(res.data.secure_url);
      })
      .catch(() => {
        setIsUploading(false);
        alert("Something went wrong uploading the image. Try again later.");
      });
  };

  const checkErrors = () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      profileImage.trim() === "" ||
      phone.trim() === "" ||
      education.trim() === "" ||
      position.trim() === "" ||
      started.trim() === ""
    ) {
      setShowError(true);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!checkErrors()) {
      return;
    }
    const newEmployee = {
      name,
      email,
      profileImage,
      phone,
      education,
      position,
      started
    };

    editEmployee(employee._id, newEmployee, history);
  };

  return (
    <div className="row">
      <div className="col-md-8 mx-auto">
        <div className="card">
          <div className="card-body">
            {errorMessage && (
              <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="strech-items">
                <i
                  className="fa fa-arrow-circle-left fa-2x"
                  style={{ color: "#007bff", cursor: "pointer" }}
                  onClick={cancelEdit}
                ></i>
                <h3 className="text-center text-primary">Edit Employee Data</h3>
              </div>
              <hr />
              {isUploading ? (
                <p className="text-center py-2">Loading Image...</p>
              ) : (
                <div className="text-center mb-2">
                  <img
                    className="rounded-circle"
                    width="180"
                    height="180"
                    src={profileImage}
                    alt={name}
                  />
                </div>
              )}
              <div className="row">
                <div className="col-md-6">
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
                  <label htmlFor="profile_image">Profile Image:</label>
                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChangeFile}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        {fileName}
                      </label>
                    </div>
                  </div>
                  {showError && profileImage.trim() === "" ? (
                    <span className="text-danger">
                      Profile image is required
                    </span>
                  ) : null}
                  {file && (
                    <div className="text-center">
                      <button
                        className="btn btn-outline-primary mb-2"
                        onClick={upload}
                      >
                        Upload Image
                      </button>
                    </div>
                  )}{" "}
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
                    <label htmlFor="phone">Phone:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                    {showError && phone.trim() === "" ? (
                      <span className="text-danger">Phone is required</span>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="education">Education:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter education"
                      value={education}
                      onChange={e => setEducation(e.target.value)}
                    />
                    {showError && education.trim() === "" ? (
                      <span className="text-danger">Education is required</span>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Position:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter position"
                      value={position}
                      onChange={e => setPosition(e.target.value)}
                    />
                    {showError && position.trim() === "" ? (
                      <span className="text-danger">Position is required</span>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="started">Started at:</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter position"
                      value={started}
                      onChange={e => setStarted(e.target.value)}
                    />
                    {showError && started.trim() === "" ? (
                      <span className="text-danger">
                        Start date is required
                      </span>
                    ) : null}
                  </div>
                  <div className="strech-items">
                    <button type="submit" className="btn btn-success">
                      {" "}
                      Edit Profile{" "}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={cancelEdit}
                    >
                      {" "}
                      Cancel Editing
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    errorMessage: state.employee.errorMessage
  };
};

export default connect(
  mapStateToProps,
  { editEmployee }
)(EditEmployee);
