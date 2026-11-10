import React, {useContext} from 'react'
import FormPost from "../components/FormPost.jsx";
import PostItem from "../components/PostItem.jsx";
import {StoreContext} from "../context/StoreContext.jsx";

function GlobalPost() {

    const {isLoading, posts,} = useContext(StoreContext);

    return (
        <div>
            <FormPost/>
            {isLoading ? "Chargement..." : <PostItem posts={posts}/>}
        </div>
    );
}


export default GlobalPost
