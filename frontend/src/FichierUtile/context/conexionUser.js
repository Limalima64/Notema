import { createContext } from 'react';

export const AuthContext = createContext({
  signIn: false,
  userId: null,
  noteId: null,
  login: () => {},
  logout: () => {},
  noteIdFunc: () => {},
  enleverNoteId: () => {},
});