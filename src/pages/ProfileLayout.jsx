import React, {useContext, useEffect} from "react";
import Navbar from "../components/Navbar.jsx";
import {StoreContext} from "../context/StoreContext.jsx";
import PhotoCouvProfile from "../components/PhotoCouvProfile.jsx";
import Footer from "../components/Footer.jsx";
import MenuGaucheProfile from "../components/MenuGaucheProfile.jsx";
import {Outlet} from "react-router-dom";


function ProfileLayout() {

    const {navigate, accessToken} = useContext(StoreContext);

    useEffect(() => {
        if (!accessToken) {
            navigate("/connexion");
        }
    }, [accessToken, navigate])


    return (
        <div className="bg-gray-200 w-full ">
            <Navbar/>
            <PhotoCouvProfile/>

            <div className=" mt-4 mx- sm:mx-[8%] flex flex-col sm:flex-row gap-5">
                <MenuGaucheProfile/>
                <div className="sm:flex-1 ">
                    <Outlet/>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default ProfileLayout;