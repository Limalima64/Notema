const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const utilisateurRoutes = require("./routes/utilisateurs-routes");
const notesRoutes = require("./routes/notes-routes");
const Erreur = require("./models/http-erreur");

const app = express();

app.use(bodyParser.json());

app.use((requete, reponse, next) => {
    reponse.setHeader("Access-Control-Allow-Origin", "*");
    reponse.setHeader("Access-Control-Allow-Headers", "*");
    reponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

app.use("/utilisateurs", utilisateurRoutes);
app.use("/notes", notesRoutes);

app.use((requete, reponse, next) => {
    return next(new Erreur("Route non trouvée", 404));
});

app.use((error, requete, reponse, next) => {
    if(reponse.headerSent){
        return next(error);
    };
    reponse.status(error.code || 500);
    reponse.json({
        message: error.message || "Une erreur inconnue est survenue",
    });
});

mongoose
.connect("mongodb://127.0.0.1:27017/projetNotes")
.then(() => {
    app.listen(5000);
    console.log("Connexion à la base de données réussie");
})
.catch(erreur => {
    console.log(erreur);
});