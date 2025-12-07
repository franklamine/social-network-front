import React, {useContext, useEffect} from 'react'
import FormPost from "../components/FormPost.jsx";
import PostItem from "../components/PostItem.jsx";
import {StoreContext} from "../context/StoreContext.jsx";
import {FaVideo} from "react-icons/fa6";
import {FaPhotoVideo, FaSmile} from "react-icons/fa";

function Home() {

    const {getUserById, userConnected, accessToken, posts, setPosts, isLoading, getAllPost} = useContext(StoreContext);

    const photoProfileUserConnected = userConnected?.photoProfileUserConnected;
    const nomEtPrenomUserConnected = userConnected?.nom + " " + userConnected?.prenom;
    const idUserConnected = userConnected?.id


    useEffect(() => {
        if (accessToken) {
            getAllPost();
        }
    }, [accessToken]);

    return (
        <div>
            <FormPost photoProfileUserConnected={photoProfileUserConnected}  getAllPost={getAllPost} idUserConnected={idUserConnected} getUserById={getUserById}/>
            {isLoading ? "Chargement..." : <PostItem nomEtPrenomUserConnected={nomEtPrenomUserConnected} getUserById={getUserById} posts={posts} setPosts={setPosts} photoProfileUserConnected={photoProfileUserConnected} />}
        </div>
    )
}

export default Home
