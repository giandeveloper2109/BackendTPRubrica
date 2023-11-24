const mongoose = require('mongoose');

const descriptorSchema = new mongoose.Schema({
  nombre: String,
  puntaje: Number,
});

const criterioSchema = new mongoose.Schema({
  nombre: String,
  descriptores: [descriptorSchema],
});

const categoriaSchema = new mongoose.Schema({
  nombre: String,
  criterios: [criterioSchema],
});

const rubricaSchema = new mongoose.Schema({
  idUsuario: String,
  nombreUsuario: String,
  rubricas: [
    {
      _id: Number,
      nombre: String,
      curso: String,
      carrera: String,
      categorias: [categoriaSchema],
    },
  ],
});

const Rubrica = mongoose.model('Rubrica', rubricaSchema);

module.exports = Rubrica;
