import React from "react";


function AsideGauche() {


    return (
        <aside
            className="hidden sm:block fixed top-16 left-0 bottom-0 w-[25%]  p-4  z-40 text-facebookText">
            <h2 className="  mb-4 ">MENU</h2>
            <ul className="space-y-3 ">
                <li><a href="#" className="hover: ">Fil d’actualité</a></li>
                <li><a href="#" className="hover: ">Messages</a></li>
                <li><a href="#" className="hover: ">Groupes</a></li>
            </ul>
        </aside>
    );
}

export default AsideGauche;