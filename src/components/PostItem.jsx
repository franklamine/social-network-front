import {FaRegComment, FaRegHeart, FaRegThumbsUp, FaThumbsUp, FaTimes, FaUserCircle} from "react-icons/fa";
import Comment from "./Comment.jsx";
import React, {useContext, useEffect, useState} from "react";
import {formatDistanceToNow} from "date-fns";
import {fr} from "date-fns/locale";
import {Link} from "react-router-dom";
import {handleFollow} from "../utils-fonctions/handleFollow.js";
import {handleUnFollow} from "../utils-fonctions/handleUnFollow.js";
import {handleLiked} from "../utils-fonctions/handleLiked.js";
import {StoreContext} from "../context/StoreContext.jsx";

export default function PostItem({posts}) {

    const {
        userConnected,
        setPosts,
        likedPosts,
        setLikedPosts,
        followersUsers,
        setFollowersUsers,
        getAllCommentByPostId
    } = useContext(StoreContext);


    const [showComment, setShowComment] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const handleComment = (id) => {
        if (selectedPostId === id) {
            setShowComment(!showComment);
        } else {
            getAllCommentByPostId(id)
            setSelectedPostId(id);
            setShowComment(true);
        }
    }

//permet de blocker le scrrol du body lorsque le modal apparait
    useEffect(() => {
        if (showComment) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        //si le composant est demonté remet le scrool au body
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [showComment]);


    return (

        <div>
            {posts.map((post) => (
                <div key={post.id} className="bg-white shadow w-full ">
                    <div className="flex items-center gap-4 px-4 pt-2">
                        {post.author.userProfile ?
                            <Link to={`/profile/${post.author.id}`}><img
                                className="w-10 h-10 rounded-full object-cover" src={`${post.author.userProfile}`}
                                alt=""/></Link> :
                            <Link to={`/profile/${post.author.id}`}><FaUserCircle
                                className="w-10 h-10 text-gray-400"/></Link>
                        }
                        <div className="flex-1 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-sm ">{post.author.prenom}
                                    {post.author.id !== userConnected?.id ? (
                                        !followersUsers[post.author.id] ?
                                            <button onClick={() => handleFollow(post.author.id, setFollowersUsers)}
                                                    className={"ml-2 px-2 text-white border rounded bg-[#8A2BE2]"}>suivre</button>
                                            : <button onClick={() => handleUnFollow(post.author.id, setFollowersUsers)}
                                                      className={"ml-2 text-blue-500"}>suivis</button>
                                    ) : null}
                                </h3>
                                <h4 className="text-xs">{formatDistanceToNow(new Date(post.createdAt), {
                                    addSuffix: true,
                                    locale: fr
                                })}</h4>
                            </div>
                            <FaTimes className="w-7 h-7 pr-3 "/>
                        </div>

                    </div>
                    <p className="px-4 py-4 text-sm">{post.message}</p>

                    {post.urlPhoto && (
                        <img src={post.urlPhoto} alt="photo" className="w-full"/>
                    )}

                    {post.urlVideo && (
                        <video controls className="w-full ">
                            <source src={post.urlVideo}/>
                            Votre navigateur ne supporte pas la lecture vidéo.
                        </video>
                    )}
                    <div className="flex items-center justify-between text-sm px-4 py-2 ">
                        <div className="flex items-center gap-2 ">
                            <FaThumbsUp className="text-blue-500"/>
                            <span>{post.likeCount}</span>
                        </div>
                        <div className="flex items-center gap-4 ">
                            <p>{post.commentCount} Comments</p>
                            <p>0 Share</p>
                        </div>
                    </div>

                    <hr className="bg-gray-200 h-[2px] mx-3 "/>

                    <div className="flex justify-around text-gray-500 text-sm  px-2 py-1 border ">
                        <button
                            onClick={() => handleLiked(post.id, setLikedPosts, setPosts)}
                            className={`${likedPosts[post.id] ? "text-blue-500" : ""} flex items-center gap-2 px-2 py-2  rounded hover:bg-gray-200 transition duration-200`}>
                            <FaRegHeart className=" w-5 h-5"/>
                            <span>Like</span>
                        </button>
                        <button onClick={() => handleComment(post.id)}
                                className="flex items-center gap-2 px-2 py-2  rounded hover:bg-gray-200 transition duration-200">
                            <FaRegComment className=" w-5 h-5"/>
                            <span>Comment</span>
                        </button>
                        <button
                            className="flex items-center gap-2 px-2 py-2 rounded  hover:bg-gray-200 transition duration-200">
                            <FaRegThumbsUp className=" w-5 h-5"/>
                            <span>Share</span>
                        </button>
                    </div>

                    {showComment && selectedPostId === post.id ? <Comment setShowComment={setShowComment} postId={post.id} /> : ""}
                </div>
            ))}
        </div>

    )
}