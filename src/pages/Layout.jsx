import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar.jsx";
import AsideGauche from "../components/AsideGauche.jsx";
import AsideDroite from "../components/AsideDroite.jsx";
import {Outlet} from "react-router-dom";
import {useContext, useEffect} from "react";
import {StoreContext} from "../context/StoreContext.jsx";

function Layout() {

    const {navigate, accessToken} = useContext(StoreContext);


    useEffect(() => {
        if (!accessToken) {
            navigate("/connexion");
        }
    }, [accessToken, navigate])

    return (
            <div className="min-h-screen ">
                <Navbar/>
                <AsideGauche/>
                <AsideDroite/>
                <main className="absolute top-16 sm:left-[25%] sm:right-[25%] bottom-0 px-4 py-2 ">
                    <Outlet/>
                </main>
            </div>

    )
}

export default Layout;
