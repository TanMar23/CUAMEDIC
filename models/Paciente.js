const {model,Schema} = require("mongoose");
const PLM = require("passport-local-mongoose");

const PacienteSchema = new Schema(
  {
    name: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: String,
    fotoPerfil: {
      type: String
    },
    peso: [Number],
    talla: [Number],
    IMC: [Number],
    porcentajeGrasa: [Number],
    porcentajeMusculo: [Number],
    indiceCinturaCadera: [Number],
    MetabolismoBasalEnReposo: [Number],
    fotosProgreso: [String]
    },
  { timestamps: true }
);

PacienteSchema.plugin(PLM, {
  usernameField: "email"
});

module.exports = model("Paciente", PacienteSchema);