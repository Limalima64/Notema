import React, { useContext, useEffect, useState } from "react";

import { useHttpClient } from "../../FichierUtile/hooks/http-hook";
import { AuthContext } from "../../FichierUtile/context/conexionUser";
import { useNavigate } from "react-router-dom";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import "../Css/ModifierNote.css";

const ModifierNote = () => {
    const auth = useContext(AuthContext);
    const { error, sendRequest, clearError } = useHttpClient();

    const [modifTitre, setModifTitre] = useState("");
    const [modifNote, setModifNote] = useState("");
    const [modifDateFinish, setModifDateFinish] = useState(new Date());

    useEffect(() => {
        if(error){
          alert(error);
          clearError();
        }
      }, [error, clearError]);

      const noteId = auth.noteId;
      const navigate = useNavigate();

    const modifierNote = async event => {
        event.preventDefault();
        try{
            const reponseData = await sendRequest(
                // eslint-disable-next-line no-useless-concat
                `http://localhost:5000/`+`notes/updateNote/${noteId}`,
                "PATCH",
                JSON.stringify({
                    titre: modifTitre,
                    note: modifNote,
                    dateFinish: modifDateFinish,
                }),
                {
                    "Content-Type": "application/json",
                }
            );

            console.log(reponseData);
            alert("La note à bien été modifié!");

            navigate("/notes");
            auth.enleverNoteId();

        }catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const getNote = async () => {
            try{
                const reponseData = await sendRequest(
                    // eslint-disable-next-line no-useless-concat
                    `http://localhost:5000/` + `notes/getNote/${noteId}`
                );
                setModifTitre(reponseData.note.titre);
                setModifNote(reponseData.note.note);
                setModifDateFinish(new Date(reponseData.note.dateFinish));

            }catch (err) {
                console.log(err);
            }
        };
        getNote();
    }, [sendRequest, noteId]);

    function saisieModifTitreHandler(event) {
        setModifTitre(event.target.value);
      }

    function saisieModifNoteHandler(event) {
        setModifNote(event.target.value);
      }

      
    function saisieModifDateFinishHandler(selectedDate) {
        
        setModifDateFinish(selectedDate);
    }

    return(
        <div className="containerModif">
            <h3 className="titreInfosModif">Modifier votre note!</h3>
            <form className="formulaireModif" onSubmit={modifierNote}>
                <label>Modifier le titre de la note:</label>
                <input 
                    className="inputTitreModif"
                    type="text"
                    value={modifTitre}
                    onChange={saisieModifTitreHandler}
                    placeholder="Modifier le titre de la note"
                />
                <br/>
                <label>Modifier le texte de la note:</label>
                <textarea 
                    className="inputNoteModif"
                    value={modifNote}
                    onChange={saisieModifNoteHandler}
                    placeholder="Modifier le texte de la note ici..."
                    rows={5}
                    cols={40}
                />
                <br/>
                <label>Modifier la date de la fin de la note:</label>
                <div className="datePickerContainerModif">
                <DatePicker
                    className="inputDateModif"
                    placeholderText="Modifier la date de fin"
                    selected={modifDateFinish}
                    onChange={saisieModifDateFinishHandler}
                    dateFormat="yyyy-MM-dd"
                    popperPlacement="right-start"
                />
                </div>
                <br/>
                <button className="buttonFormulaireModifNote" type="submit">Modifier cette note</button>
                <br/>
            </form>
        </div>
    );
};

export default ModifierNote;