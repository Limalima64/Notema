const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const utilisateurSchema = new Schema({
    nom:{type: String, required: true},
    courriel:{type: String, required: true, unique: true},
    motDePasse:{type: String, required: true},
    notes:[{type: mongoose.Types.ObjectId, required: true, ref:"Note"}]
});

module.exports = mongoose.model("Utilisateur", utilisateurSchema);