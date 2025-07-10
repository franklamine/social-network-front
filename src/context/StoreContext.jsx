import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import customAxios from "../api/customAxios.js";


export const StoreContext = createContext(null);


function StoreContextProvider({children}) {

    const [connectedUser, setConnectedUser] = useState({});
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

    //get connected user
    const getConnectedUser = async () => {
        try {
            const res = await customAxios.get("/utilisateurs/connected");
            console.log(res);
            if (res.status === 200) {
                setConnectedUser(res.data);
            }
        }catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (accessToken) {
            getConnectedUser();
        }
    }, [accessToken])


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
        connectedUser, navigate, posts, setPosts, isLoading, setIsLoading,
        accessToken, setAccessToken, getAllPost, getConnectedUser
    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
