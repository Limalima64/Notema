const { v4 : uuidv4} = require("uuid");
const Erreur = require("../models/http-erreur");

const Note = require("../models/note");
const Utilisateur = require("../models/utilisateur");

const getNotesByUserId = async (requete, reponse, next) =>{
    const utilisateurId = requete.params.utilisateurId;

    let notes;
    let utilisateur
    try{
        utilisateur = await Utilisateur.findById(utilisateurId).populate("notes");
        notes = utilisateur.notes;
    } catch {
        return next(new Erreur("Erreur lors de la récupération des notes de l'utilisateur avec ce id: " + utilisateurId, 500));
    }

    if(!notes || notes.length === 0) {
        return next(new Erreur(utilisateur.nom + ", aucune note a été trouvé.\n.\n.\nVous pouvez toujours en creer une!", 404));
    }

    reponse.json({
        notes: notes.map((note) => note.toObject({ getters: true})),
    });
};

const creationNote = async (requete, reponse, next) => {
    const utilisateurId = requete.params.utilisateurId;

    const { titre, note, dateFinish } = requete.body;

    let utilisateur;
    try{
        utilisateur = await Utilisateur.findById(utilisateurId);
    } catch {
        return next(new Erreur("Une erreur est survenue lors de la recuperation de l'utilisateur!", 422));
    }

    if(!utilisateur){
        return next(new Erreur("Utilisateur non trouvé avec ce Id", 401));
    }

    let nouvelNote = new Note({
        titre,
        note,
        dateCreated: new Date().toLocaleDateString("fr-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }),
        dateFinish: new Date(dateFinish).toLocaleDateString("fr-CA"),
        utilisateur: utilisateur.id,
    })

    try{
        utilisateur.notes.push(nouvelNote);
        await nouvelNote.save();
        await utilisateur.save();
    }catch{
        return next(new Erreur("Erreur lors de la creation de la nouvel note", 422));
    }
    reponse.json({message: "La creation de la note a été réussie!"});
};

const updateNote = async (requete, reponse, next) => {
    const noteId = requete.params.noteId;
    const { titre, note, dateFinish} = requete.body;

    let laNote;
    try{
        laNote = await Note.findById(noteId);
        laNote.titre = titre;
        laNote.note = note;
        laNote.dateFinish = new Date(dateFinish).toLocaleDateString("fr-CA");
        await laNote.save();
    } catch {
        return next(new Erreur("Une erreur est survenue lors de la mise à jour de la note!", 500))
    }
    reponse.status(200).json({ laNote: laNote.toObject({ getters: true })});
};

const deleteNote = async (requete, reponse, next) => {
    const noteId = requete.params.noteId;

    let note;
    try{
        note = await Note.findById(noteId).populate("utilisateur");
    } catch {
        return next(new Erreur("Un Probleme est survenue!", 500));
    }

    if(!note) {
        return next(new Erreur("Note non trouvée!", 404));
    }

    try{
        
        note.utilisateur.notes.pull(note);
        await note.utilisateur.save();
        await note.deleteOne();
    } catch {
        return next(new Erreur("Une Erreur est survenue lors de la suppresion de la note", 500));
    }
    reponse.status(200).json({ message: "Note supprimée!" });
};

const getNote = async (requete, reponse, next) => {
    const noteId = requete.params.noteId;

    let note;

    try{
        note = await Note.findById(noteId);
    }catch (err){
        return next(new Erreur("Erreur lors de la récupération des notes", 500));
    }

    if (!note) {
        return next(new Erreur("Aucune note trouvée pour l'id fourni", 404));
    }

    reponse.json({ note: note.toObject({ getters: true }) });
}

exports.getNotesByUserId = getNotesByUserId;
exports.creationNote = creationNote
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
exports.getNote = getNote;