import React, {useContext} from 'react'
import {logout} from "../utils-fonctions/logout.js";
import {StoreContext} from "../context/StoreContext.jsx";

function ProfileCart() {
    
    const {navigate, setAccessToken} = useContext(StoreContext);

    return (
        <div>
            <div className="w-[480px] h-[400px] right-14 bg-slate-200 rounded-xl shadow-xl transition duration-200 ">
                <img className="w-10 h-10 rounded-full" src="logo-min.png" alt=""/>
                <p></p>
                <p></p>
                <button    onClick={() => logout(navigate, setAccessToken)}>log Out</button>
                <p></p>
            </div>
        </div>
    )
}

export default ProfileCart
