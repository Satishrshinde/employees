const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  files: [{ filename: String, path: String }]
});

const User = model('user', UserSchema);
module.exports = User