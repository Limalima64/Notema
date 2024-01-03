import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes ,
  Navigate
} from 'react-router-dom';

import { AuthContext } from './FichierUtile/context/conexionUser';
import MainNavigation from './Navigation/Page/MainNavigation';
import Login from './User/Pages/Login.js';
import Register from './User/Pages/Register';
import Apropos from './Apropos/Page/apropos.js';
import Profil from './User/Pages/Profil';
import NotesUser from './Note/Pages/NoteUser';
import AjoutNote from './Note/Pages/AjoutNote.js';
import ModifNote from './Note/Pages/ModifierNote.js';

const App = () => {

  const [signIn, setSignIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [noteId, setNoteId] = useState(null);

  const login = useCallback((userId) => {
    setSignIn(true);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setSignIn(false);
    setUserId(null);
  }, []);

  const noteIdFunc = useCallback((noteId) => {
    setNoteId(noteId);
  }, []);

  const enleverNoteId = useCallback(() => {
    setNoteId(null);
  }, []);

  return (
    <AuthContext.Provider
        value={{signIn: signIn, userId: userId, noteId: noteId, login: login, logout: logout, noteIdFunc: noteIdFunc, enleverNoteId: enleverNoteId}}
    >
      <Router>
        <MainNavigation />
          <Routes>
            {signIn ? (
              <React.Fragment>
                <Route path="/profil" element={<Profil />} />
                <Route path="/notes" element={<NotesUser />} />
                <Route path="/ajoutNote" element={<AjoutNote />} />
                <Route path="/modifierNote" element={<ModifNote />} />
                <Route path="/apropos" element={<Apropos />} />
                <Route
                  path="/*"
                  element={<Navigate to="/profil" replace />}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/apropos" element={<Apropos />} />
                <Route
                  path="/*"
                  element={<Navigate to="/" replace />}
                />
              </React.Fragment>
            )}
          </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
