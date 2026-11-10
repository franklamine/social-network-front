import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import customAxios from "../api/customAxios.js";


export const StoreContext = createContext(null);


function StoreContextProvider({children}) {


    const [accessToken, setAccessToken] = useState(() => {
        const tokens = JSON.parse(localStorage.getItem("token") || "null");
        return tokens?.accessToken || "";
    });
    const [userProfile, setUserProfile] = useState({});
    const [userConnected, setUserConnected] = useState({});
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [postsUser, setPostUser] = useState([]);
    const [commentsUser, setCommentsUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [likedPosts, setLikedPosts] = useState({});
    const [followersUsers, setFollowersUsers] = useState({});


    useEffect(() => {
        if (accessToken) {
            getUserConnected();
            getAllPost();
        }
    }, [accessToken]);


    //get connected user
    const getUserConnected = async () => {
        try {
            const res = await customAxios.get(`/utilisateurs/connected`);
            if (res.status === 200) {
                console.log(res.data)
                setUserConnected(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getUserProfileById = async (userId) => {
        try {
            const res = await customAxios.get(`/utilisateurs/${userId}`);
            if (res.status === 200) {
                setUserProfile(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }


    // To get all post
    const getAllPost = async () => {
        setIsLoading(true);
        try {
            const response = await customAxios.get(`/publications`);
            if (response.status === 200) {
                console.log(response.data);
                setPosts(response.data);
                //initialise l'etat des postes liké par par l'utilisateur connecter
                const likers = {};
                response.data.forEach((post) => {
                    likers[post.id] = post.isLiked; //boolean
                })
                setLikedPosts(likers);

                const followers = {};
                response.data.forEach((post) => {
                    followers[post.idAuthor] = post.isFollowingAuthor //boolean
                })
                setFollowersUsers(followers);
            }
        } catch (error) {
            console.log("Impossible de charger les publications." + error.message);
        } finally {
            setIsLoading(false);
        }
    }


    // To get all post by userId
    const getAllPostByUserId = async (userId) => {
        console.log(userId);
        setIsLoading(true);
        try {
            const response = await customAxios.get(`/publications/utilisateur/${userId}`);
            if (response.status === 200) {
                console.log(response.data);
                setPostUser(response.data);
                //initialise l'etat des postes liké par par l'utilisateur connecter
                const likers = {};
                response.data.forEach((post) => {
                    likers[post.id] = post.isLiked; //boolean
                })
                setLikedPosts(likers);

                const followers = {};
                response.data.forEach((post) => {
                    followers[post.idAuthor] = post.isFollowingAuthor //boolean
                })
                setFollowersUsers(followers);
            }
        } catch (error) {
            console.log("Impossible de charger les publications." + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const getAllCommentByPostId = async (postId) => {
        const response = await customAxios.get(`/comment/publication/${postId}`);
        if (response.status === 200) {
            console.log(response.data);
            setCommentsUser(response.data);
        }
    }


    const value = {
        userProfile,
        userConnected,
        navigate,
        posts,
        postsUser,
        setPosts,
        isLoading,
        setIsLoading,
        accessToken,
        setAccessToken,
        likedPosts,
        setLikedPosts,
        followersUsers,
        setFollowersUsers,
        commentsUser,
        setCommentsUser,
        getAllPost,
        getAllPostByUserId,
        getUserProfileById,
        getUserConnected,
        getAllCommentByPostId
    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
