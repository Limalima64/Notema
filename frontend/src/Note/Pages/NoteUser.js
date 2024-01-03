import React, { useContext, useEffect, useState } from "react";

import { useHttpClient } from "../../FichierUtile/hooks/http-hook";
import { AuthContext } from "../../FichierUtile/context/conexionUser";
import { Link, useNavigate } from "react-router-dom";
import "../Css/NoteUser.css";

const NoteUser = () => {
    const auth = useContext(AuthContext);
    const { error, sendRequest, clearError } = useHttpClient();

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if(error){
          alert(error);
          clearError();
        }
      }, [error, clearError]);

    const userId = auth.userId;
    const navigate = useNavigate();

    useEffect(() => {
      const getNotes = async () => {
        try {
          const reponseData = await sendRequest(
            // eslint-disable-next-line no-useless-concat
            `http://localhost:5000/` + `notes/getNotesByUserId/${userId}`
          );
          setNotes(reponseData.notes);
        }catch (err) {
          console.log(err);
        }
      };
      getNotes();
    }, [sendRequest, userId]);

    const deleteNote = async (noteId) => {
      try {
        const reponseData = await sendRequest(
          // eslint-disable-next-line no-useless-concat
          `http://localhost:5000/` + `notes/deleteNote/${noteId}`,
          "DELETE",
          JSON.stringify({}),
          {
            "Content-Type": "application/json",
          }
        );
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
        alert(reponseData.message);
      }catch (err) {
        console.log(err);
      }
    };

    const pageModifierNote = async (noteId) => {
      auth.noteIdFunc(noteId);
      navigate("/modifierNote");
    };

    return(
        <div>
           <h1 className="titreNotes">Mes notes</h1>
           {notes.length === 0 ? ( 
              <div>
                <h2 className="pasNotes">Vous n'avez pas de notes à votre nom.</h2> 
                <h2 className="ajoutNoteLien">Clicker <Link to={`/ajoutNote`}>ici</Link> pour ajouter une note!</h2>
              </div>
           ) : ( 
            <ul className="listeNotes">
              {notes.map((note) => (
                <li key={note.id}>
                  <div className="divListe">
                    <h2><i>{note.titre}</i> - {new Date(note.dateFinish).toISOString().split('T')[0]}</h2>
                    <p className="note" style={{ whiteSpace: 'pre-line' }}>{note.note}</p>
                    <br/>
                    <p>Créé le: {note.dateCreated}<br/></p>
                    <div className="buttonContainer">
                    <button className="suppNote" onClick={() => deleteNote(note.id)}>Supprimer</button>
                    <button className="modifNote" onClick={() => pageModifierNote(note.id)}>Modifier</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            )}
        </div>
    );
};

export default NoteUser;