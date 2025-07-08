import React from "react";


function AsideGauche() {


    return (
        <aside
            className="hidden sm:block fixed top-16 left-0 bottom-0 w-[25%] bg-white p-4 rounded-r-2xl shadow-lg  z-40">
            <h2 className="text-lg font-bold mb-4 text-pink-600">Menu</h2>
            <ul className="space-y-3 text-gray-700">
                <li><a href="#" className="hover:text-pink-500 font-medium">Fil d’actualité</a></li>
                <li><a href="#" className="hover:text-pink-500 font-medium">Messages</a></li>
                <li><a href="#" className="hover:text-pink-500 font-medium">Groupes</a></li>
            </ul>
        </aside>
    );
}

export default AsideGauche;