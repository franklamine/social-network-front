import {FaRegComment, FaRegHeart, FaRegThumbsUp, FaThumbsUp, FaTimes, FaUserCircle} from "react-icons/fa";
import {StoreContext} from "../context/StoreContext.jsx";
import React, {useContext} from "react";
import FormComment from "./FormComment.jsx";
import {differenceInHours, formatDistanceToNow} from "date-fns";
import {fr} from "date-fns/locale";

function Comment({posts, setPosts, postId, setShowComment, photoProfileUserConnected, nomEtPrenomUserConnected}) {


    const post = posts.find(post => post.id === postId);

    const comments = post.comments;


    return (
        <div>
            <hr className="bg-gray-200 h-[2px] mx-3 "/>

            {comments.length > 0 ?

                <div className="flex justify-center items-center bg-black fixed inset-0 bg-opacity-50 z-50 ">
                    <div
                        className="fixed w-full sm:w-[50%] mx-4 sm:mx-auto h-[1100px] sm:h-[800px] bg-white rounded-lg overflow-y-auto">

                        {/*title */}
                        <div className=" flex justify-between items-center border-b-2 border-gray-200 p-2">
                            <h1></h1>
                            <h1 className="font-semibold ">{post.auteurPublication}{"'s"}{" "}Post</h1>
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 ">
                                <FaTimes onClick={() => setShowComment(false)} className="cursor-pointer"/>
                            </div>
                        </div>

                        {/*post*/}
                        <div className="bg-white rounded-2xl shadow mx-auto mb-3 ">
                            <div className="flex items-center gap-4 px-2 pt-2">
                                {post.photoAuteurPublication ?
                                    <img className="w-10 h-10 rounded-full object-cover" src={post.photoAuteurPublication}
                                         alt=""/> :
                                    <FaUserCircle className="w-10 h-10 text-gray-400"/>
                                }
                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm ">{post.auteurPublication}</h3>
                                    <h4 className="text-xs">{formatDistanceToNow(new Date(post.date), {
                                        addSuffix: true,
                                        locale: fr
                                    })}</h4>
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
                                    className="flex items-center gap-2 px-14 py-2  rounded hover:bg-gray-200 transition duration-200">
                                    <FaRegHeart className=" w-5 h-5"/> <span>Like</span></button>
                                <button
                                    className="flex items-center gap-2 px-14 py-2  rounded hover:bg-gray-200 transition duration-200">
                                    <FaRegComment className=" w-5 h-5"/> <span>Comment</span></button>
                                <button
                                    className="flex items-center gap-2 px-14 py-2 rounded  hover:bg-gray-200 transition duration-200">
                                    <FaRegThumbsUp className=" w-5 h-5"/> <span>Share</span></button>
                            </div>

                            <hr className="bg-gray-200 h-[2px] mx-3 mb-2 "/>

                            {/*Comment list*/}
                            {comments?.map((comment, index) => (
                                <div key={index} className="">
                                    <div className="flex items-center gap-4 p-3 ">
                                        {comment.photoAuteurComment ?
                                            <img className="w-10 h-10 rounded-full object-cover" src={comment.photoAuteurComment}
                                                 alt=""/> :
                                            <FaUserCircle className="w-10 h-10 text-gray-400"/>
                                        }
                                        <div className="bg-gray-200 rounded-lg p-2 ">
                                            <p className="font-semibold text-sm">{comment.auteurComment}</p>
                                            <p className="text-sm">{comment.message}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 ml-20 text-xs mt-[-10px]">
                                        <p className="text-sm">{differenceInHours(new Date(), new Date(post.date))}h</p>
                                        <p>Like</p>
                                        <p>Reply</p>
                                    </div>
                                </div>
                            ))}

                            {/*Form to make et comment*/}
                            <FormComment setPosts={setPosts} postId={postId} photoProfileUserConnected={photoProfileUserConnected} nomEtPrenomUserConnected={nomEtPrenomUserConnected} />

                        </div>

                    </div>

                </div>

                : <FormComment posts={posts} setPosts={setPosts} postId={postId} photoProfileUserConnected={photoProfileUserConnected} nomEtPrenomUserConnected={nomEtPrenomUserConnected} />

            }

        </div>
    )
}

export default Comment
