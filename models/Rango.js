const mongoose = require('mongoose');

const rangoSchema = new mongoose.Schema({
    minimo: { type: Number, required: true },
    maximo: { type: Number, required: true }
});

const Rango = mongoose.model('Rango', rangoSchema);

module.exports = Rango;
