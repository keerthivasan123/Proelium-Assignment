const User = require("../models/user");
const bcrypt = require('bcrypt');

exports.getUserById = (req, res, next, id) => {
  User.findById(id).select('-password').exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User not found in DB"
      });
    }
    req.user = user;
    next();
  });
};

exports.createUser = async (req, res) => {
  if(req.body.password !== req.body.confirmPassword){
    return res.status(400).json({
        error: "Password and Confirm Password did not match"
      });
  }
  const user = new User(req.body)
  user.password = await bcrypt.hash(req.body.password, 1);

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save user in DB"
      });
    }
    res.json({ user });
  });
};

exports.getUser = (req, res) => {
  delete req.inputUser.password;
  return res.json(req.inputUser);
};

exports.getAllUser = (req, res) => {
  User.find().select('-password').exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: "NO Users found"
      });
    }
    res.json(users);
  });
};

exports.updateUser = (req, res) => {
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
    
  user.save((err, updatedUser) => {
    delete updatedUser.password;
    if (err) {
      return res.status(400).json({
        error: "Failed to update user"
      });
    }
    res.json(updatedUser);
  });
};
