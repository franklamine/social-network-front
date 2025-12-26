import React, {useContext, useEffect} from 'react'
import FormPost from "../components/FormPost.jsx";
import PostItem from "../components/PostItem.jsx";
import {StoreContext} from "../context/StoreContext.jsx";
import {FaVideo} from "react-icons/fa6";
import {FaPhotoVideo, FaSmile} from "react-icons/fa";

function Home() {

    const {
        getUserById,
        userConnected,
        accessToken,
        posts,
        setPosts,
        likedPosts,
        setLikedPosts,
        isLoading,
        setIsLoading,
        getAllPost,
        followersUsers,
        setFollowersUsers
    } = useContext(StoreContext);

    const photoProfileUserConnected = userConnected?.photoProfileUserConnected;
    const idUserConnected = userConnected?.id


    useEffect(() => {
        if (accessToken) {
            getAllPost();
        }
    }, [accessToken]);

    return (
        <div>
            <FormPost setIsLoading={setIsLoading} photoProfileUserConnected={photoProfileUserConnected}
                      getAllPost={getAllPost} idUserConnected={idUserConnected} getUserById={getUserById}/>
            {isLoading ? "Chargement..." :
                <PostItem getUserById={getUserById} posts={posts} setPosts={setPosts} likedPosts={likedPosts}
                          idUserConnected={idUserConnected} setLikedPosts={setLikedPosts}
                          followersUsers={followersUsers}
                          setFollowersUsers={setFollowersUsers} photoProfileUserConnected={photoProfileUserConnected}/>}
        </div>
    )
}

export default Home
