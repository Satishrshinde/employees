const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

const UserModel = model('user', UserSchema);
module.exports = UserModel;