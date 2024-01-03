import React from "react";

import "../Css/apropos.css";

const apropos = () => {

    return (
        <div className="apropos">
            <h1>Bonjour! Voici Notema.</h1>
            <div className="informations">
                <h2>Un site web facinnant, qui permet de créer des notes pour des futurs plans, pour se rappeler des choses à faires et plusieur autres utilités.</h2>
                <div className="infosNonConnecté">
                    <h3>
                        Utilité quand on n'est pas connecté!
                    </h3>
                    <ol>
                        <li>Vous pouvez créer un compte avec votre nom, courriel et mot de passe.</li>
                        <li>Vous pouvez également vous connecter apres avoir créer votre compte pour avoir accès à plus de fonctions.</li>
                        <li>Finalement, vous pouvez arriver à cette page pour voir les informations de tout le site web.</li>
                    </ol>
                </div>
                <div className="infosConnecté">
                    <h3>
                        Quand vous êtes connecté vous pouvez faire beaucoup plus de choses!
                    </h3>
                    <ol>
                        <li>Vous pouvez accèdez à vos informations de compte dans la section "Mon profil" et modifier n'importe quels de ses informations.</li>
                        <li>Si vous n'avez pas de note à votre nom, la page "Mes notes" va contenir un lien qui va vous amene à la page "Ajout de note".</li>
                        <li>Une fois dans la section "Ajout de note", vous pouvez créé une note en ajoutant un titre, la note et la date de la fin de la note.</li>
                        <li>Si vous avez au moins une note à votre nom, dans la page "Mes notes" vous pouvez avoir accès à vos notes créé et vous pouvez supprimer ou modifier n'importe quel note.</li>
                        <li>Si vous supprimer une note, une page de confirmation apparaitra.</li>
                        <li>Si vous decidez de modifier votre note, vous pouvez modifier sois le titre, la note ou la date de fin de la note.</li>
                        <li>Deplus, vous pouvez toujours accèdez à cette page une fois connecté.</li>
                    </ol>
                </div>
            </div>
        </div>
    );

};

export default apropos;