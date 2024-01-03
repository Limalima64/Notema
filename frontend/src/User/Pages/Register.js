import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../FichierUtile/hooks/http-hook";
import {Link, useNavigate } from "react-router-dom";
import "../Css/RegisterLogin.css";

const Register = () => {
  const [saisieNom, setSaisieNom] = useState("");
  const [saisieCourriel, setSaisieCourriel] = useState("");
  const [saisieMotDePasse, setSaisieMotDePasse] = useState("");

  const { error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

    useEffect(() => {
        if(error){
          alert(error);
          clearError();
        }
      }, [error, clearError]);

  const SignIn = async (event) => {
    event.preventDefault();

    try {
      const reponseData = await sendRequest(
        "http://localhost:5000/utilisateurs/SignIn",
        "POST",
        JSON.stringify({
            nom: saisieNom,
            courriel: saisieCourriel,
            motDePasse: saisieMotDePasse

        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(reponseData);
      alert("Votre profil à bien été connecter, maintenant connectez vous!");
      setSaisieNom("");
      setSaisieCourriel("");
      setSaisieMotDePasse("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }

    if (saisieNom === "") {
      alert(
        "Veuillez entrez votre nom."
      );
      return;
    } else if (saisieCourriel === "") {
      alert("Veuillez entrer votre courriel.");
      return;
    }  else if (saisieMotDePasse === "") {
      alert("Veuillez entrer votre mot de passe.");
      return;
    }
  };

  function saisieNomHandler(event) {
    setSaisieNom(event.target.value);
  }

  function saisieCourrielHandler(event) {
    setSaisieCourriel(event.target.value);
  }

function saisieMotDePasseHandler(event) {
  setSaisieMotDePasse(event.target.value);
}

  return (
    <div className="inscription">
        <h1>Bienvenue - Register</h1>
        <h4><Link to="/">Login</Link></h4>
    <form onSubmit={SignIn}>
      <label htmlFor="nomEtudiant">Nom: </label>
      <input
        type="text"
        value={saisieNom}
        onChange={saisieNomHandler}
        placeholder="Entrez un nom"
      />
      <br></br>
      <label htmlFor="courrielEtudiant">Courriel: </label>
      <input
        type="texte"
        value={saisieCourriel}
        onChange={saisieCourrielHandler}
        placeholder="Entrez un courriel"
      />
      <br></br>
      <label htmlFor="motDePasseEtudiant">Mot de passe: </label>
      <input
        type="password"
        value={saisieMotDePasse}
        onChange={saisieMotDePasseHandler}
        placeholder="Entrez un mot de passe"
      />
      <br/>
      <button className="button" type="sumbit">Enregistrer</button>
    </form>
    </div>
  );
}

export default Register;