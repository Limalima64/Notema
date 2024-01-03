import React, { useContext, useEffect, useState } from "react";

import { useHttpClient } from "../../FichierUtile/hooks/http-hook";
import { AuthContext } from "../../FichierUtile/context/conexionUser";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../Css/AjoutNote.css";

const AjoutNote = () => {
    const auth = useContext(AuthContext);
    const { error, sendRequest, clearError } = useHttpClient();

    const [titre, setTitre] = useState("");
    const [note, setNote] = useState("");
    const [dateFinish, setDateFinish] = useState(new Date());

    useEffect(() => {
        if(error){
          alert(error);
          clearError();
        }
      }, [error, clearError]);

    const userId = auth.userId;

    const creeNote = async event => {
        event.preventDefault();
        try{
            const reponseData = await sendRequest(
                // eslint-disable-next-line no-useless-concat
                `http://localhost:5000/`+`notes/creationNote/${userId}`,
                "POST",
                JSON.stringify({
                    titre: titre,
                    note: note,
                    dateFinish: dateFinish,
                }),
                {
                    "Content-Type": "application/json",
                }
            );
            console.log(reponseData);
            alert("La note à bien été ajouté!");

            setTitre("");
            setNote("");
            setDateFinish("");

        }catch (err){
            console.log(err);
        }
    };

    function saisieTitreHandler(event) {
        setTitre(event.target.value);
      }

    function saisieNoteHandler(event) {
        setNote(event.target.value);
      }

      
    function saisieDateFinishHandler(selectedDate) {
        setDateFinish(selectedDate);
    }


    return(
        <div className="containerAdd">
            <h3 className="titreInfosAdd">Ajouter une note avec un titre et la date de fin!</h3>
            <form className="formulaire" onSubmit={creeNote}>
                <label>Ajouter le titre de la note:</label>
                <input 
                    className="inputTitre"
                    type="text"
                    value={titre}
                    onChange={saisieTitreHandler}
                    placeholder="Titre de la note"
                />
                <br/>
                <label>Ajouter le texte de la note:</label>
                <textarea 
                    className="inputNote"
                    value={note}
                    onChange={saisieNoteHandler}
                    placeholder="Saisissez le texte de la note ici..."
                    rows={5}
                    cols={40}
                />
                <br/>
                <label>Ajouter la date de la fin de la note:</label>
                <div className="datePickerContainer">
                <DatePicker
                    className="inputDate"
                    placeholderText="Date de fin"
                    selected={dateFinish}
                    onChange={saisieDateFinishHandler}
                    dateFormat="yyyy-MM-dd"
                    popperPlacement="right-start"
                />
                </div>
                <br/>
                <button className="buttonFormulaireAjoutNote" type="submit">Ajouter cette note</button>
                <br/>
            </form>
        </div>
    );
};

export default AjoutNote;