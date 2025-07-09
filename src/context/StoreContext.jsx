import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import customAxios from "../api/customAxios.js";


export const StoreContext = createContext(null);


function StoreContextProvider({children}) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [accessToken, setAccessToken] = useState("");



    useEffect(() => {
        const tokens = localStorage.getItem("token");
        if (tokens) {
            const accessToken = JSON.parse(tokens).accessToken;
            setAccessToken(accessToken);
        }
    }, []);


    // To get all post
    const getAllPost = async () => {
        setIsLoading(true);
        try {
            const response = await customAxios.get(`/publications`);
            if (response.status === 200) {
                setPosts(response.data);
            }
        } catch (error) {
            console.log("Impossible de charger les publications." + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (accessToken) {
            getAllPost();
        }
    }, [accessToken]);


    const value = {
        navigate, posts, setPosts, isLoading, setIsLoading,
        accessToken, setAccessToken, getAllPost
    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
