const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const employeeSchema = new Schema(
  {
    name: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    fotoPerfil: {
      type: String
    }
  },
  { timestamps: true }
);

employeeSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  hashField: "password"
});

module.exports = mongoose.model("Employee", employeeSchema);
