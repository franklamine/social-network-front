import React, {useContext, useEffect} from "react";
import Navbar from "../components/Navbar.jsx";
import {StoreContext} from "../context/StoreContext.jsx";
import PhotoCouvProfile from "../components/PhotoCouvProfile.jsx";
import Footer from "../components/Footer.jsx";
import MenuGaucheProfile from "../components/MenuGaucheProfile.jsx";
import {Outlet, useParams} from "react-router-dom";


function ProfileLayout() {

    const {id} = useParams();
    const {navigate, accessToken} = useContext(StoreContext);

    const {user, userConnected, getUserById, followersUsers, setFollowersUsers} = useContext(StoreContext);

    const photoProfile = user?.profile?.photoProfile;

    const photoCouverture = user?.profile?.photoCouverture;


    useEffect(() => {
        if (!accessToken) {
            navigate("/connexion");
        }
    }, [accessToken, navigate])


    return (
        <div className="bg-gray-200 w-full ">
            <Navbar/>
            <PhotoCouvProfile id={id} getUserById={getUserById} photoCouverture={photoCouverture}
                              photoProfile={photoProfile} user={user} userConnected={userConnected}
                              followersUsers={followersUsers} setFollowersUsers={setFollowersUsers}/>

            <div className=" mt-4 mx- sm:mx-[8%] flex flex-col sm:flex-row gap-5">
                <MenuGaucheProfile user={user} userConnected={userConnected}/>
                <div className="sm:flex-1 ">
                    <Outlet/>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default ProfileLayout;