import customAxios from "../api/customAxios.js";

export const handleLiked = async (postId, setLikedPosts, setPosts) => {
    try {
        const res = await customAxios.post("/likeposts/post/" + postId);
        if (res.status === 200) {

            setLikedPosts((prev) => ({...prev, [postId]: !prev[postId]}));

            setPosts(prev => prev.map(p => p.id === postId ? {...p, likeCount: res.data} : p));
        }

    } catch (error) {
        console.log(error);
    }
};
