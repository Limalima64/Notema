const express = require("express");

const controleursNotes = require("../controllers/notes-controlleurs");
const router = express.Router();

router.get('/getNotesByUserId/:utilisateurId', controleursNotes.getNotesByUserId);

router.post('/creationNote/:utilisateurId', controleursNotes.creationNote);

router.patch('/updateNote/:noteId', controleursNotes.updateNote);

router.delete('/deleteNote/:noteId', controleursNotes.deleteNote);

router.get('/getNote/:noteId', controleursNotes.getNote);

module.exports = router;