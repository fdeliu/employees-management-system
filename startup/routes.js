const express = require('express');
const employees = require('../routes/employees');
const users = require('../routes/users');

module.exports = function(app){
    app.use(express.json());
    app.use("/api/employees", employees);
    app.use("/api/users", users);
}