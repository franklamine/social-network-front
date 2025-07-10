import React, {useContext, useEffect} from 'react'
import FormPost from "../components/FormPost.jsx";
import PostItem from "../components/PostItem.jsx";
import {StoreContext} from "../context/StoreContext.jsx";
import {FaVideo} from "react-icons/fa6";
import {FaPhotoVideo, FaSmile} from "react-icons/fa";

function Home() {

    const {connectedUser, accessToken, posts, isLoading, getAllPost} = useContext(StoreContext);

    const photoProfile = connectedUser?.profile?.photoProfile;


    useEffect(() => {
        if (accessToken) {
            getAllPost();
        }
    }, [accessToken]);

    return (
        <div>
            <FormPost photoProfile={photoProfile} />
            {isLoading ? "Chargement..." : <PostItem posts={posts} photoProfile={photoProfile} />}
        </div>
    )
}

export default Home
