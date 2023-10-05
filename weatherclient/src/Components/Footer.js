import React from "react";

export default function Footer ()
{
    return (
        <div className="text-white w-full fixed bottom-0 bg-blue-100 text-center ">
            <div className="flex">
                <div className="w-2/3 bg-blue-300 flex flex-col">
                    <p>Nous contacter</p>
                    <p>Mentions légales</p>
                    <p>Politique de confidentialité</p>
                </div>
                <div className="w-1/3 bg-blue-300">
                    <p>Suivez moi sur</p>
                    <p>LinkedIn</p>
                </div>
            </div>
            <div className="w-full bg-blue-400">
                <p>© Quentin Guidez - Tous droits réservés</p>
            </div>
        </div>
    )
}