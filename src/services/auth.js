const bcrypt = require("bcryptjs");
const User = require("../models/auth");
const jwt = require("jsonwebtoken");

module.exports.getUsers = async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (error) {
      res.status(500).json({message: error.message});
  }
}

module.exports.login = async (req, res) => {
  const user = await User.findOne({email: req.body.email});

  try {
      if(user){
        const passCheck = bcrypt.compareSync(req.body.pass, user.pass);

        if(passCheck){
          const token = jwt.sign({
            userId: user._id,
          }, "jwtkey");

          const { pass, ...other } = user;
          
          res.cookie("access_token", token, {
            httpOnly: true
          }).status(200).json(other);
        } else {
          res.status(404).json("Contraseña incorrecta");
        }
      } else{
        res.status(404).json("Usuario incorrecto o no existe");
        
      }
  } catch (error) {
      res.status(404).json({message: error.message});
  }
}

module.exports.logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out")
}

module.exports.register = async (req, res) => {

  const userfind = await User.findOne({email: req.body.email});
  try {
      if(userfind){
        res.status(404).json("User already exist");
      } else{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.pass, salt);

        const user = new User({
          name: req.body.name,
          email: req.body.email,
          pass: hash,
          created_at: req.body.created_at
        });

        const inserteduser = await user.save();
        res.status(201).json(inserteduser);
        
      }
  } catch (error) {
      res.status(400).json({message: error.message});
  }
}

module.exports.updateUser = async (req, res) => {
  try {
      const updateduser = await User.updateOne({_id:req.params.id}, {$set: req.body});
      res.status(200).json(updateduser);
  } catch (error) {
      res.status(400).json({message: error.message});
  }
}

module.exports.deleteUser = async (req, res) => {
  try {
      const deleteduser = await User.deleteOne({_id:req.params.id});
      res.status(200).json(deleteduser);
  } catch (error) {
      res.status(400).json({message: error.message});
  }
}