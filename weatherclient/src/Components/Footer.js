import React from "react";

export default function Footer ()
{
    return (
        <div className="text-white w-full fixed bottom-0 bg-[#181818] text-center ">
            <div className="flex">
                <div className="w-2/3 bg-[#181818] flex flex-col mx-auto">
                    <p>Nous contacter</p>
                    <p>Mentions légales</p>
                    <p>Politique de confidentialité</p>
                </div>
            </div>
            <div className="w-full bg-[#181818]">
                <p>© Quentin Guidez - Tous droits réservés</p>
            </div>
        </div>
    )
}