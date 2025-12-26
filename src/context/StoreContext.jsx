import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import customAxios from "../api/customAxios.js";


export const StoreContext = createContext(null);


function StoreContextProvider({children}) {

    const [user, setUser] = useState({});
    const [userConnected, setUserConnected] = useState({});
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [accessToken, setAccessToken] = useState("");
    const [likedPosts, setLikedPosts] = useState({});


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
            const res = await customAxios.get(`/utilisateurs/connected`);
            if (res.status === 200) {
                setUserConnected(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getUserById = async (userId) => {
        try {
            const res = await customAxios.get(`/utilisateurs/${userId}`);
            if (res.status === 200) {
                setUser(res.data);
            }
        } catch (error) {
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
                //initialise l'etat des postes liké par par l'utilisateur connecter
                const liked = {};
                response.data.forEach((post) => {
                    liked[post.id] = post.likedByConnectedUser;
                })
                setLikedPosts(liked);
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
        user, userConnected, navigate, posts, setPosts, isLoading, setIsLoading,
        accessToken, setAccessToken, getAllPost, getUserById, getConnectedUser,
        likedPosts, setLikedPosts,
    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
