const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    titre:{type: String, required: true },
    note:{type: String, required: true},
    dateCreated:{type: String, required: true},
    dateFinish: { type: Date, required: true, default: Date.now, get: v => moment.utc(v).format('YYYY-MM-DDTHH:mm:ss') },
    utilisateur: {type: mongoose.Types.ObjectId, required: true, ref: "Utilisateur"},
});

module.exports = mongoose.model("Note", noteSchema);