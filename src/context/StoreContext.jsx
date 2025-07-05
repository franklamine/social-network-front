import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {customAxios} from "../api/httpClients.js";


export const StoreContext = createContext(null);


function StoreContextProvider({children}) {

    const navigate = useNavigate();
    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [accessToken, setAccessToken] = useState("");
    const [isValidAccessToken, setValidAccessToken] = useState(true);
    const [authLoading, setAuthLoading] = useState(true);



    useEffect(() => {
        if (!accessToken && localStorage.getItem("token")) {
            setAccessToken(JSON.parse(localStorage.getItem("token")).accessToken);
        }
        setAuthLoading(false); // Ici on dit "J'ai fini de lire le localStorage"

    }, [accessToken])

// verifies if the token is not expired
    useEffect(() => {
        if (accessToken) {
            try {
                const jwtPayload = jwtDecode(accessToken);
                const currentTime = Date.now() / 1000;
                if (jwtPayload.exp < currentTime) {
                    localStorage.removeItem("token");
                    setAccessToken("");
                    setValidAccessToken(false);
                }
            } catch (error) {
                console.error("Erreur de décodage du token : ", error);
                localStorage.removeItem("token");
            }
        }
    }, [accessToken]);


    // To get all post
    const getPublications = async () => {
        try {
            const response = await customAxios.get(`/publications`);
            if (response.status === 200) {
                setPublications(response.data);
            }
        } catch (error) {
            console.log("Impossible de charger les publications." + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(accessToken && isValidAccessToken) {
            getPublications();
        }
    }, [accessToken, isValidAccessToken]);


    const value = {
        navigate, publications, setPublications, isLoading, setIsLoading,
        accessToken, setAccessToken, isValidAccessToken, getPublications,authLoading
    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
