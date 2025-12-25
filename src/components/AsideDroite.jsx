import React from "react";


function AsideDroite() {


    return (
        <aside
            className="hidden sm:block fixed top-16 right-0 bottom-0 w-[25%]  p-4 z-10 text-facebookText">
            <h2 className="text-lg  mb-4 ">Suggestions d’amis</h2>
            <ul className="space-y-3">
                <li className="flex justify-between items-center">
                    <span className="">Emma Lou</span>
                    <button className=" hover:underline ">Ajouter</button>
                </li>
                <li className="flex justify-between items-center">
                    <span className="">Karim D.</span>
                    <button className=" hover:underline ">Ajouter</button>
                </li>
            </ul>
        </aside>
    );
}

export default AsideDroite;