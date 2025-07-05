import React from "react";


function AsideDroite() {


    return (
        <aside
            className="fixed top-16 right-0 bottom-0 w-1/5 bg-white p-4 rounded-l-2xl shadow-lg overflow-auto z-40">
            <h2 className="text-lg font-bold mb-4 text-rose-600">Suggestions d’amis</h2>
            <ul className="space-y-3">
                <li className="flex justify-between items-center">
                    <span className="font-medium">Emma Lou</span>
                    <button className="text-pink-500 hover:underline text-sm">Ajouter</button>
                </li>
                <li className="flex justify-between items-center">
                    <span className="font-medium">Karim D.</span>
                    <button className="text-pink-500 hover:underline text-sm">Ajouter</button>
                </li>
            </ul>
        </aside>
    );
}

export default AsideDroite;