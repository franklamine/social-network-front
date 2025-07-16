import React, {useContext, useEffect} from 'react'
import FormPost from "../components/FormPost.jsx";
import PostItem from "../components/PostItem.jsx";
import {StoreContext} from "../context/StoreContext.jsx";
import {FaVideo} from "react-icons/fa6";
import {FaPhotoVideo, FaSmile} from "react-icons/fa";

function Home() {

    const {getUserById, user, userConnected, accessToken, posts, isLoading, getAllPost} = useContext(StoreContext);

    const photoProfile = user?.profile?.photoProfile;
    const photoProfileUserConnected = userConnected?.photoProfileUserConnected;
    const idUserConnected = userConnected?.id


    useEffect(() => {
        if (accessToken) {
            getAllPost();
        }
    }, [accessToken]);

    return (
        <div>
            <FormPost photoProfileUserConnected={photoProfileUserConnected}  getAllPost={getAllPost} idUserConnected={idUserConnected} getUserById={getUserById}/>
            {isLoading ? "Chargement..." : <PostItem getUserById={getUserById} posts={posts} photoProfile={photoProfile} />}
        </div>
    )
}

export default Home
