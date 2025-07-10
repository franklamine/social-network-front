import {FaRegComment, FaRegHeart, FaRegThumbsUp, FaThumbsUp, FaTimes, FaUserCircle} from "react-icons/fa";
import Comment from "./Comment.jsx";
import React, {useState} from "react";
import {formatDistanceToNow} from "date-fns";
import {fr} from "date-fns/locale";


export default function PostItem({photoProfile, posts}) {
    const [showComment, setShowComment] = useState(false);
    const [indexPost, setIndexPost] = useState(null);
    const [likedPosts, setLikedPosts] = useState({});
console.log(posts);

    const handleComment = (index) => {

        if (indexPost === index) {
            setShowComment(!showComment);
        } else {
            setIndexPost(index);
            setShowComment(true);
        }
    }

    const handleLiked = (postId) => {
        setLikedPosts((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    return (

        <div>
            {posts.map((post, index) => (
                <div key={index} className="bg-white rounded-2xl shadow mx-auto mb-3 ">
                    <div className="flex items-center gap-4 px-2 pt-2">
                        {post.photoAuteurPublication ?
                            <img className="w-10 h-10 rounded-full object-cover" src={`${post.photoAuteurPublication}`} alt=""/> :
                            <FaUserCircle className="w-10 h-10 text-gray-400" />
                        }
                        <div className="flex-1 flex items-center justify-between">{post.name}
                            <div>
                                <h3 className="font-semibold text-sm ">{post.auteurPublication}</h3>
                                <h4 className="text-xs">{formatDistanceToNow(new Date(post.date), {addSuffix:true, locale:fr})}</h4>
                            </div>
                            <FaTimes className="w-7 h-7 pr-3 "/>
                        </div>

                    </div>
                    <p className="px-2 text-sm">{post.message}</p>

                    {post.photo && (
                        <img src={post.photo} alt="photo" className="w-full"/>
                    )}

                    {post.video && (
                        <video controls className="w-full ">
                            <source src={post.video}/>
                            Votre navigateur ne supporte pas la lecture vidéo.
                        </video>
                    )}
                    <div className="flex items-center justify-between text-sm px-4 py-2 ">
                        <div className="flex items-center gap-2 ">
                            <FaThumbsUp className="text-blue-500"/>
                            <span>22</span>
                        </div>
                        <div className="flex items-center gap-4 ">
                            <p>{post.comments.length} Comments</p>
                            <p>1 Share</p>
                        </div>
                    </div>

                    <hr className="bg-gray-200 h-[2px] mx-3 "/>

                    <div className="flex justify-around text-gray-500 text-sm  px-2 py-1 ">
                        <button
                            onClick={()=>handleLiked(post.id)} className={`${likedPosts[post.id] ? "text-blue-500" : ""} flex items-center gap-2 px-14 py-2  rounded hover:bg-gray-200 transition duration-200`}>
                            <FaRegHeart  className=" w-5 h-5"/> <span>Like</span></button>
                        <button onClick={() => handleComment(index)}
                                className="flex items-center gap-2 px-14 py-2  rounded hover:bg-gray-200 transition duration-200">
                            <FaRegComment className=" w-5 h-5"/> <span>Comment</span></button>
                        <button
                            className="flex items-center gap-2 px-14 py-2 rounded  hover:bg-gray-200 transition duration-200">
                            <FaRegThumbsUp className=" w-5 h-5"/> <span>Share</span></button>
                    </div>

                    {showComment && indexPost === index ?
                        <Comment postId={post.id} setShowComment={setShowComment} photoProfile={photoProfile} /> : ""}
                </div>
            ))}
        </div>

    )
}