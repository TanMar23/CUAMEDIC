const {model,Schema} = require("mongoose");
const PLM = require("passport-local-mongoose");

const UserSchema = new Schema(
  {
    name: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type:String,
      enum: ['MEDICO', 'EMPLEADO'],
      default: 'EMPLEADO'
    },
    fotoPerfil: {
      type: String
    }
  },
  { timestamps: true }
);

UserSchema.plugin(PLM, {
  usernameField: "email"
});

module.exports = model("User", UserSchema);