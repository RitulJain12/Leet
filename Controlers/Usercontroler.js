const User = require('../Models/Usermodel');
require('dotenv').config();
const Validations = require('../Validations/uservalidate');
module.exports.Reguser = async (req, res) => {
  try {
     Validations(req.body);
   const {email, password} = req.body;
  const hashedPass = await User.hashpass(password);
  req.body.password = hashedPass;
  req.body.role="user";
     const NewUser = await User.create(req.body);
    //const token = NewUser.jwt(email,'user');
   //res.cookie('token', token, { maxAge: 60 * 60 * 1000 });

    res.status(201).json({ message: "Successfully Registered" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.Loguser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Invalid Credentials");

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isValid = await user.Compare(password, user.password);
    if (!isValid) return res.status(402).json({ message: "Invalid Credentials" });
    const {_id,role}=user;
    const token = user.jwt(_id,email,role);
    res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
    res.status(200).send("Log In Successfully");
  } catch (err) {
    res.status(401).send(err.message);
  }
};
module.exports.LogOutUser = async (req, res) => {
  try {
    res.status(200).send("Log In Successfully");
  } catch (err) {
    res.status(401).send(err.message);
  }
};
module.exports.getUser = async (req, res) => {
  try {

     res.status(200).json(req.user);
  } catch (err) {
    res.status(401).send(err.message);
  }
};
module.exports.Regadmin = async (req, res) => {
  try {
     Validations(req.body);
   const {email, password} = req.body;
  const hashedPass = await User.hashpass(password);
  req.body.password = hashedPass;
  req.body.role="admin";
     const NewUser = await User.create(req.body);
    const token = NewUser.jwt(email,req.body.role);
   res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
    res.status(201).json({ message: "Successfully Registered" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



