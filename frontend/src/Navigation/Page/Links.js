import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../FichierUtile/context/conexionUser';

import '../Css/Links.css'

//Manque le css
const Links = props => {
  const auth = useContext(AuthContext);

     return (
      <ul className='nav-links'>
        {!auth.signIn && (
          <li>
          <Link to="/" exact>
            Accueil
          </Link>
        </li>
        )}
        {!auth.signIn && (
        <li>
          <Link to="/apropos" exact>
            A propos
          </Link>
        </li>
        )}
        {auth.signIn && (
          <li>
            <Link to={"/profil"}>Mon profil</Link>
          </li>
        )}
        {auth.signIn && (
          <li>
            <Link to={"/notes"}>Mes notes</Link>
          </li>
        )}
        {auth.signIn && (
          <li>
            <Link to="/ajoutNote" exact>
            Ajout de note
          </Link>
          </li>
        )}
        {auth.signIn && (
          <li>
            <Link to="/apropos" exact>
            A propos
          </Link>
          </li>
        )}
        {auth.signIn && (
          <li>
            <button onClick={auth.logout}>Déconnexion</button>
          </li>
        )}
      </ul>
     );
}

export default Links;