const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 200
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

userSchema.methods.generateToken = function() {
  const token = jwt.sign({ _id: this._id }, 'some_jwt_token');
  return token;
};

const User = mongoose.model('User', userSchema);

async function AddUser(user) {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(user.password, salt);
  console.log(password);
  let newUser = new User({
    name: user.name,
    email: user.email,
    password: password
  });
  newUser = await newUser.save();
  return newUser;
}

async function getUseres() {
  return await User.find().select('-password');
}

async function login(user) {
  const target = await User.findOne({ email: user.email });
  const isValid = await bcrypt.compare(
    user.password,
    !target ? '' : target.password
  );
  if (!isValid) {
    return false;
  }

  return target;
}

async function getUser(id) {
  const user = await User.findById(id);
  return user;
}

module.exports = { AddUser, getUseres, getUser, login, userSchema };
