import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar.jsx";
import AsideGauche from "../components/AsideGauche.jsx";
import AsideDroite from "../components/AsideDroite.jsx";
import {Outlet} from "react-router-dom";
import {useContext, useEffect} from "react";
import {StoreContext} from "../context/StoreContext.jsx";

function HomeLayout() {

    const {navigate, accessToken} = useContext(StoreContext);


    useEffect(() => {
        if (!accessToken) {
            navigate("/connexion");
        }
    }, [accessToken, navigate])

    return (
            <div className="min-h-screen">
                <Navbar/>
                <AsideGauche/>
                <AsideDroite/>

                <main className=" mt-16 box-border py-2 sm:mx-[25%] ">
                    <Outlet />
                </main>
            </div>

    )
}

export default HomeLayout;
