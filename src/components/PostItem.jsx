import {FaRegComment, FaRegHeart, FaRegThumbsUp, FaThumbsUp, FaTimes, FaUserCircle} from "react-icons/fa";
import Comment from "./Comment.jsx";
import React, {useEffect, useState} from "react";
import {formatDistanceToNow} from "date-fns";
import {fr} from "date-fns/locale";
import {Link} from "react-router-dom";
import {handleFollow} from "../utils-fonctions/handleFollow.js";
import {handleUnFollow} from "../utils-fonctions/handleUnFollow.js";
import {handleLiked} from "../utils-fonctions/handleLiked.js";

export default function PostItem({
                                     photoProfileUserConnected,
                                     posts,
                                     setPosts,
                                     likedPosts,
                                     setLikedPosts,
                                     idUserConnected,
                                     followersUsers,
                                     setFollowersUsers
                                 }) {
    const [showComment, setShowComment] = useState(false);
    const [idPost, setIdPost] = useState(null);

    const handleComment = (id) => {

        if (idPost === id) {
            setShowComment(!showComment);
        } else {
            setIdPost(id);
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
                        {post.photoAuteurPublication ?
                            <Link to={`/profile/${post.idAuteur}`}><img
                                className="w-10 h-10 rounded-full object-cover" src={`${post.photoAuteurPublication}`}
                                alt=""/></Link> :
                            <Link to={`/profile/${post.idAuteur}`}><FaUserCircle
                                className="w-10 h-10 text-gray-400"/></Link>
                        }
                        <div className="flex-1 flex items-center justify-between">{post.name}
                            <div>
                                <h3 className="font-semibold text-sm ">{post.auteurPublication}
                                    {post.idAuteur !== idUserConnected ? (
                                        !followersUsers[post.idAuteur] ?
                                            <button onClick={() => handleFollow(post.idAuteur, setFollowersUsers)}
                                                    className={"ml-2 px-2 text-white border rounded bg-[#8A2BE2]"}>suivre</button>
                                            : <button onClick={() => handleUnFollow(post.idAuteur, setFollowersUsers)}
                                                      className={"ml-2 text-blue-500"}>suivis</button>
                                    ) : null}
                                </h3>
                                <h4 className="text-xs">{formatDistanceToNow(new Date(post.date), {
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
                            <p>{post.comments.length} Comments</p>
                            <p>0 Share</p>
                        </div>
                    </div>

                    <hr className="bg-gray-200 h-[2px] mx-3 "/>

                    <div className="flex justify-around text-gray-500 text-sm  px-2 py-1 border ">
                        <button
                            onClick={() => handleLiked(post.id,setLikedPosts, setPosts)}
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

                    {showComment && idPost === post.id ?
                        <Comment posts={posts} setPosts={setPosts}
                                 postId={post.id} setShowComment={setShowComment}
                                 photoProfileUserConnected={photoProfileUserConnected}/> : ""}
                </div>
            ))}
        </div>

    )
}