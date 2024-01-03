import React, { useState, useContext, useEffect } from "react";

import { useHttpClient } from "../../FichierUtile/hooks/http-hook";
import { AuthContext } from "../../FichierUtile/context/conexionUser";
import {Link} from "react-router-dom";
import "../Css/RegisterLogin.css";

const Login = () => {
    const auth = useContext(AuthContext);
    const [saisieCourriel, setSaisieCourriel] = useState("");
    const [saisieMdp, setSaisieMdp] = useState("");

    const { error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        if(error){
          alert(error);
          clearError();
        }
      }, [error, clearError]);

  const connexion = async(event) => {
    event.preventDefault();

    try{
      const reponseData = await sendRequest(
        "http://localhost:5000/utilisateurs/connexion",
        "POST",
        JSON.stringify({
            courriel: saisieCourriel,
            motDePasse: saisieMdp,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(reponseData);
      auth.login(reponseData.utilisateur.id);
      alert("Connexion Réussi!");
    }catch(erreur){
      console.log(erreur);
    }

    if(saisieCourriel === ""){
      alert("Entrez un courriel valide!");
      return;
    }else if (saisieMdp === ""){
      alert("Entrez un mot de passe valide!");
      return;
    }
  };

  function saisieCourrielHandler(event) {
    setSaisieCourriel(event.target.value);
  }

  function saisieMdpHandler(event) {
    setSaisieMdp(event.target.value);
  }

  return (
    <div className="inscription">
      <h1>Bienvenue - Login</h1>
      <h4><Link to="/register">Register</Link></h4>
      <form className="nouveau-stage-form" onSubmit={connexion}>
      <label htmlFor="courrielEtudiant">Courriel: </label>
      <input
        type="text"
        value={saisieCourriel}
        onChange={saisieCourrielHandler}
        placeholder="Votre Courriel"
      />
      <label htmlFor="motDePasseEtudiant">Mot de passe: </label>
      <input
        type="password"
        value={saisieMdp}
        onChange={saisieMdpHandler}
        placeholder="Votre mot de passe"
      />
      <br/>
      <button className="button" type="sumbit">Connexion</button>
      </form>
    </div>
    
  );

};

export default Login;