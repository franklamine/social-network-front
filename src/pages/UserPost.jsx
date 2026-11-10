import React, {useContext, useEffect} from 'react'
import FormPost from "../components/FormPost.jsx";
import PostItem from "../components/PostItem.jsx";
import {StoreContext} from "../context/StoreContext.jsx";
import {useParams} from "react-router-dom";


function UserPost() {

    const {id} = useParams();
    const {isLoading, accessToken, postsUser, getAllPostByUserId} = useContext(StoreContext);

    useEffect(() => {
        if (accessToken) {
            getAllPostByUserId(id)
        }
    }, [accessToken]);

    return (
        <div>
            <FormPost/>

            {isLoading ? "Chargement..." : <PostItem posts={postsUser}/>}
        </div>
    )
}


export default UserPost
