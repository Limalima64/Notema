const { v4 : uuidv4} = require("uuid");
const Erreur = require("../models/http-erreur");

const Utilisateur = require("../models/utilisateur");

const SignIn = async (requete, reponse, next) => {
    const {nom, courriel, motDePasse} = requete.body;

    let utilisateurExiste;

    try{
        utilisateurExiste = await Utilisateur.findOne({ courriel: courriel });
    } catch {
        return next(new Erreur("Échec de la vérification de si l'utilisateur éxiste!", 500));
    }

    if (utilisateurExiste) {
        return next(new Erreur("L'utilsateur avec le courriel: " + utilisateurExiste.courriel + ", existe deja!, veuillez vos connecter!", 422));
    }

    let nouvelUtilisateur = new Utilisateur({
        nom, 
        courriel, 
        motDePasse,
        notes: [],
    });

    try{
        await nouvelUtilisateur.save();
    } catch (err){
        return next(new Erreur("Erreur lors de la creation du nouveau utilisateur!", 422));
    }
    reponse.status(201).json({utilisateur: nouvelUtilisateur.toObject({ getter: true })});
};

const connexion = async (requete, reponse, next) => {
    const { courriel, motDePasse } = requete.body;

    let utilisateurExiste;

    try {
        utilisateurExiste = await Utilisateur.findOne({ courriel: courriel });
    } catch {
        return next(new Erreur("Connexion échouée, veuillez réessayer!", 500));
    }

    if (!utilisateurExiste || utilisateurExiste.motDePasse !== motDePasse) {
        return next(new Erreur("Courriel ou mot de passe incorrect, réessayer", 401));
    }

    reponse.json({
        message: "Connexion réussie!",
        utilisateur: utilisateurExiste.toObject({ getters: true }),
    });
};

const getUserById = async (requete, reponse, next) => {
    const userId = requete.params.userId;

    let user;

    try{
        user = await Utilisateur.findById(userId);
    }catch (err){
        return next(new Erreur("Erreur lors de la récupération de l'utilisateur", 500));
    }

    if (!user) {
        return next(new Erreur("Aucun utilisateur trouvé pour l'id fourni", 404));
    }

    reponse.json({ user: user.toObject({ getters: true }) });
};

const updateUser = async (requete, reponse, next) => {
    const userId = requete.params.userId;
    const { nom, courriel, motDePasse } = requete.body;

    let user;

    try{
        user = await Utilisateur.findById(userId);

        user.nom = nom;
        user.courriel = courriel;
        user.motDePasse = motDePasse;
        
        await user.save();
    }catch (err) {
        return next(new Erreur("Erreur lors de la mise à jour de l'utilisateur", 500));
    }

    reponse.status(200).json({ user: user.toObject({ getters: true }) });
};

exports.SignIn = SignIn;
exports.connexion = connexion;
exports.getUserById = getUserById;
exports.updateUser = updateUser;