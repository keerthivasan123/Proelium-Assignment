const Admin = require("../models/user");
const bcrypt = require('bcrypt');

exports.getAdminById = (req, res, next, id) => {
  Admin.findById(id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Admin not found in DB"
      });
    }
    req.user = user;
    next();
  });
};

exports.getInputUserById = (req, res, next, id) => {
  Admin.findById(id).select('-password').exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User not found in DB"
      });
    }
    req.inputUser = user;
    next();
  });
};

exports.createAdmin = async (req, res) => {
  if(req.body.password !== req.body.confirmPassword){
    return res.status(400).json({
        error: "Password and Confirm Password did not match"
      });
  }
  const user = new Admin(req.body)
  user.password = await bcrypt.hash(req.body.password, 1);
  user.role = "ADMIN";
  
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save user in DB"
      });
    }
    res.json({ user });
  });
};

exports.getAdmin = (req, res) => {
  delete req.inputUser.password;
  return res.json(req.inputUser);
};

exports.getAllAdmin = (req, res) => {
  Admin.find().select('-password').exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: "NO Admins found"
      });
    }
    res.json(users);
  });
};

exports.updateAdmin = (req, res) => {
  const user = req.inputUser;
  if(req.body.firstName)
    user.firstName = req.body.firstName;
  if(req.body.middleName)
    user.middleName = req.body.middleName;
  if(req.body.lastName)
    user.lastName = req.body.lastName;
  if(req.body.email)
    user.email = req.body.email;
  if(req.body.department)
    user.department = req.body.department;
    
  user.save((err, updatedAdmin) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update Admin"
      });
    }
    res.json(updatedAdmin);
  });
};
