import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
// import {jwtDecode} from "jwt-decode";
import customAxios from "../api/customAxios.js";


export const StoreContext = createContext(null);


function StoreContextProvider({children}) {

    const navigate = useNavigate();
    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [accessToken, setAccessToken] = useState("");
    // const [isValidAccessToken, setValidAccessToken] = useState(true);



    useEffect(() => {
        const tokens = localStorage.getItem("token");
        if (tokens) {
            const accessToken = JSON.parse(tokens).accessToken;
            setAccessToken(accessToken);
        }
    }, []);


// verifies if the token is not expired
//     useEffect(() => {
//         if (accessToken) {
//             try {
//                 const jwtPayload = jwtDecode(accessToken);
//                 const currentTime = Date.now() / 1000;
//                 if (jwtPayload.exp < currentTime) {
//                     localStorage.removeItem("token");
//                     setAccessToken("");
//                     navigate("/connexion");
//                 }
//             } catch (error) {
//                 console.error("Erreur de décodage du token : ", error);
//                 localStorage.removeItem("token");
//                 setAccessToken("");
//                 navigate("/connexion");
//             }
//         }
//     }, [accessToken, navigate]);


    // To get all post
    const getPublications = async () => {
        setIsLoading(true);
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
        if (accessToken) {
            getPublications();
        }
    }, [accessToken]);


    const value = {
        navigate, publications, setPublications, isLoading, setIsLoading,
        accessToken, setAccessToken, getPublications
    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
