const mongoose = require("mongoose");

const UserFormSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthdate: Date,
  street: String,
  city: String,
  state: String,
  pin: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("UserFormSchema", UserFormSchema);
