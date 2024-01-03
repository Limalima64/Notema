import React, { useContext, useEffect, useState } from "react";

import { useHttpClient } from "../../FichierUtile/hooks/http-hook";
import { AuthContext } from "../../FichierUtile/context/conexionUser";
import "../Css/Profil.css";

const Register = () => {
    const auth = useContext(AuthContext);
    const { error, sendRequest, clearError } = useHttpClient();

    const [nomUser, setNomUser] = useState("");
    const [courrielUser, setCourrielUser] = useState("");
    const [mdpUser, setMdpUser] = useState("");
    const [idNoteTab, setIdNoteTab] = useState([]);

    const userId = auth.userId;

    useEffect(() => {
        if(error){
          alert(error);
          clearError();
        }
      }, [error, clearError]);

      useEffect(() => {
        const getUser = async () => {
            try{
                const reponseData = await sendRequest(
                    // eslint-disable-next-line no-useless-concat
                    `http://localhost:5000/` + `utilisateurs/user/${userId}`
                );
                setNomUser(reponseData.user.nom);
                setCourrielUser(reponseData.user.courriel);
                setMdpUser(reponseData.user.motDePasse);
                setIdNoteTab(reponseData.user.notes)
            }catch (err) {
                console.log(err);
            }
        };
        getUser();
      }, [sendRequest, userId]);

      const updateUser = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                // eslint-disable-next-line no-useless-concat
                `http://localhost:5000/` + `utilisateurs/updateUser/${userId}`,
                'PATCH',
                JSON.stringify({
                    nom: nomUser,
                    courriel: courrielUser,
                    motDePasse: mdpUser
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            alert("Votre profil à bien été modifié!");
        }catch (err){
            console.log(err);
        }

        if(nomUser === ""){
            alert("Veuillez entrer votre nouveau nom.");
            return;
        }else if (courrielUser === "") {
            alert("Veuillez entrer votre nouveau adresse courriel.");
            return;
        }else if (mdpUser === "") {
            alert("Veuillez entrer votre nouveau mot de passe.");
            return;
        }

      };

      function saisieNomHandler(event) {
        setNomUser(event.target.value);
      }

      function saisieCourrielHandler(event) {
        setCourrielUser(event.target.value);
      }

      function saisieMdpHandler(event) {
        setMdpUser(event.target.value);
      }

    return (
        <div>
            <div className = "containerProfil">
                <p className="bloc">
                    <h3 className="titreInfosProfil">Voici vos informations</h3>
                    <h3 className="fleche">↓</h3>
                    <div className = "nom">Nom d'utilisateur: <i><b>{nomUser}</b></i></div>
                    <div className = "courriel">Courriel d'utilisateur: <i><b>{courrielUser}</b></i></div>
                    <div className = "mdp">Mot de passe d'utilisateur: <i><b>{mdpUser}</b></i></div>
                    <div className="nombreNotes">Vous avez {idNoteTab.length} {idNoteTab.length < 2 ? "note" : "notes"}</div>
                </p>
            </div>
            <div className="formulaire">
                <h3>Modifier vos informations</h3>
                <form onSubmit={updateUser}>
                    <label for="">Modifier votre nom d'utilisateur:</label>
                    <input 
                        type="text"
                        value={nomUser}
                        onChange={saisieNomHandler}
                        placeholder="Nom de l'utilisateur"
                    />
                    <br/>
                    <label for="">Modifier votre courriel:</label>
                    <input 
                        type="text"
                        value={courrielUser}
                        onChange={saisieCourrielHandler}
                        placeholder="Courriel de l'utilisateur"
                    />
                    <br/>
                    <label for="">Modifier votre mot de passe:</label>
                    <input 
                        type="text"
                        value={mdpUser}
                        onChange={saisieMdpHandler}
                        placeholder="Mot de passe de l'utilisateur"
                    />
                    <br/>
                    <button className="buttonFromulaireModifier" type="submit">Modifier votre profil</button>
                    <br/>
                </form>
            </div>
        </div>
    )
}

export default Register;