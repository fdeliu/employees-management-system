const mongoose = require("mongoose");

const Employee = mongoose.model(
  "Employee",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 15
    },
    profileImage: {
      type: String,
      required: true
    },
    education: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    position: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    started: {
      type: String,
      required: true
    }
  })
);

module.exports = Employee;
