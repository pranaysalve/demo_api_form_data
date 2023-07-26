const mongoose = require("mongoose");

const UserFormSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthday: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("UserFormSchema", UserFormSchema);
