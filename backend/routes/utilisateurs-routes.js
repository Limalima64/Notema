const express = require("express");

const controleursUtilisateurs = require("../controllers/utilisateurs-controlleurs");
const router = express.Router();

router.post('/SignIn', controleursUtilisateurs.SignIn);

router.post('/connexion', controleursUtilisateurs.connexion);

router.get("/user/:userId", controleursUtilisateurs.getUserById);

router.patch("/updateUser/:userId", controleursUtilisateurs.updateUser);

module.exports = router;