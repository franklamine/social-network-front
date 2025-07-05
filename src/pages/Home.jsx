import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar.jsx";
import AsideGauche from "../components/AsideGauche.jsx";
import AsideDroite from "../components/AsideDroite.jsx";
import FormPublication from "../components/FormPublication.jsx";
import Publications from "../components/Publications.jsx";
import {useContext, useEffect} from "react";
import {StoreContext} from "../context/StoreContext.jsx";

function Home() {

    const {navigate, accessToken, isValidAccessToken, publications, isLoading, authLoading} = useContext(StoreContext);

    // useEffect(() => {
    //     if (!authLoading && (!accessToken || !isValidAccessToken)) {
    //         navigate("/connexion");
    //     }
    // },[accessToken, authLoading, isValidAccessToken, navigate])

    return (
            <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 pt-16">
                <Navbar/>
                <AsideGauche/>
                <AsideDroite/>
                <main className="absolute top-16 left-[20%] right-[20%] bottom-0 px-4 py-6 overflow-y-auto"
                      style={{maxHeight: "calc(100vh - 64px)"}}>
                    <FormPublication/>
                    {isLoading ? "Chargement..." : <Publications posts={publications}/>}
                </main>
            </div>

    )
}

export default Home;
