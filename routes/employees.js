const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();
const { validateEmployee } = require("./validation/validate");
const Employee = require("../models/employee");

router.get("/", auth, async (req, res) => {
  const employees = await Employee.find().sort("name");
  res.send(employees);
});

router.post("/new", auth, async (req, res) => {
  const { error } = validateEmployee(req.body);
  if (error) return res.status(400).send({error_msg: error.details[0].message});
  const {
    name,
    email,
    profileImage,
    phone,
    education,
    position,
    started
  } = req.body;

  const employee = new Employee({
    name,
    email,
    profileImage,
    phone,
    education,
    position,
    started
  });

  await employee.save();
  res.send({ success_msg: "Employee added successfully." });
});

router.delete("/delete/:id", auth, admin, async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee)
    return res
      .status(404)
      .send({error_msg:"The Employee with the given ID was not found."});
  res.send({success_msg:"The Employee was deleted successfully."});
});

router.put("/edit/:id", auth, async (req, res) => {
  const { error } = validateEmployee(req.body);
  if (error) return res.status(400).send({error_msg: error.details[0].message});
  const {
    name,
    email,
    profileImage,
    phone,
    education,
    position,
    started
  } = req.body;
  const employee = await Employee.findById(req.params.id)
  if (!employee)
    return res
      .status(404)
      .send({error_msg:"The Employee with the given ID was not found."});
  
  employee.name = name;
  employee.email=email;
  employee.profileImage=profileImage;
  employee.phone=phone;
  employee.education=education;
  employee.position=position;
  employee.started=started;
  await employee.save();
  res.send({success_msg: "Employee data succesfully updated"});
});

router.get("/:id", auth, async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee)
    return res
      .status(404)
      .send({error_msg:"The Employee with the given ID was not found."});

  res.send(employee);
});

module.exports = router;
