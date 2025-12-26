import React, {useContext, useEffect} from 'react'
import Navbar from "../components/Navbar.jsx";
import {StoreContext} from "../context/StoreContext.jsx";
import {FaCamera, FaChevronDown, FaEdit, FaEllipsisH, FaPlus} from "react-icons/fa";
import customAxios from "../api/customAxios.js";
import FormPost from "../components/FormPost.jsx";
import PostItem from "../components/PostItem.jsx";
import {useParams} from "react-router-dom";
import {handleUnFollow} from "../utils-fonctions/handleUnFollow.js";
import {handleFollow} from "../utils-fonctions/handleFollow.js";

function Profile() {

    const {id} = useParams();

    const {
        user,
        userConnected,
        getUserById,
        posts,
        likedPosts,
        setLikedPosts,
        isLoading,
        followersUsers,
        setFollowersUsers
    } = useContext(StoreContext);

    const postsUser = posts.filter(post => post.auteurPublication === user.nom + " " + user.prenom)

    const photoProfile = user?.profile?.photoProfile;
    const photoProfileUserConnected = userConnected?.photoProfileUserConnected;

    const photoCouverture = user?.profile?.photoCouverture;


    const uploadPhotoProfile = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("photoProfile", file);

        try {
            const res = await customAxios.post(
                "/profile/photo-profile",
                formData,
                {headers: {"Content-Type": "multipart/form-data"}}
            );

            if (res.status === 201) {
                getUserById(id); // Rafraîchir les infos du profil
            }
        } catch (err) {
            console.log(err);
        }
    };

    const uploadPhotoCouverture = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("photoCouverture", file);

        try {
            const res = await customAxios.post(
                "/profile/photo-couverture",
                formData,
                {headers: {"Content-Type": "multipart/form-data"}}
            );

            if (res.status === 201) {
                getUserById(id); // Rafraîchir les infos du profil
            }
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        getUserById(id);
    }, [id]);

    return (
        <div className=" bg-gray-200 w-full ">
            <Navbar/>
            <div className="bg-white shadow-lg ">
                <div className="relative mt-14 mx-0 sm:mx-[8%]">

                    {/*block photo de couverture*/}
                    <div className="h-52 sm:h-96 w-full sm:rounded-b-lg bg-gray-200">
                        {photoCouverture &&
                            <img className="h-52 sm:h-96 w-full sm:rounded-lg  object-cover" src={photoCouverture}
                                 alt=""/>}
                    </div>

                    <div>

                        {/*block photo de profile*/}
                        <div
                            className="absolute top-32 left-32 sm:top-80 sm:left-8 z-10 w-40 h-40 rounded-full bg-gray-300 border-4 border-white">
                            {photoProfile ?
                                <img className="w-40 h-40 rounded-full object-cover"
                                     src={photoProfile} alt=""/> :
                                <div></div>
                            }
                        </div>

                        {/* Formulaire pour photo de couverture */}
                        {user?.id === userConnected?.id && (
                            <div
                                className="absolute top-32 right-8 sm:top-80 sm:right-8 z-10 flex gap-2 items-center rounded-lg bg-white text-gray-700 px-6 py-3 sm:px-3 sm:py-2">
                                <label className="cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => uploadPhotoCouverture(e.target.files[0])}
                                    />
                                    <FaCamera className="w-7 h-7 sm:w-auto sm:h-auto"/>
                                </label>
                                <span className="hidden sm:block">Edit Cover photo</span>
                            </div>
                        )}

                        {/* Formulaire pour photo de profil */}
                        {user?.id === userConnected?.id && (
                            <div
                                className="absolute h-14 w-14 rounded-full top-56 right-36 sm:top-[440px] sm:left-36 z-20 flex items-center justify-center bg-white text-gray-700">
                                <label className="cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => uploadPhotoProfile(e.target.files[0])}
                                    />
                                    <FaCamera className="w-7 h-7"/>
                                </label>
                            </div>
                        )}


                        {/*Infos profiles*/}
                        <div
                            className=" sm:ml-[210px] sm:mr-[20px] mt-20 sm:mt-6 flex flex-col sm:flex-row justify-between items-center">
                            <div className="my-5 sm:my-0">
                                <div className="font-bold text-3xl">{user.nom}{" "}{user.prenom}</div>
                                <div className="flex gap-5">
                                    <p className="sm:text-start">{user.totalSuivis} Suivis</p>
                                    <p className="sm:text-start">{user.totalFollowers} Followers</p>
                                    <p className="sm:text-start">{user.totalLikes} Likes</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 ">
                                <div
                                    className={`flex gap-2 items-center rounded-lg ${!followersUsers[user?.id] ? "bg-[#8A2BE2] " : "bg-gray-400"} text-white px-3 py-2 cursor-pointer`}>
                                    <FaPlus/>
                                    {user?.id === userConnected?.id ? <span className="">Add to story</span> :
                                        (!followersUsers[user?.id] ?
                                                <span onClick={() => handleFollow(user?.id, setFollowersUsers)}
                                                      className="">Suivre</span> :
                                                <span onClick={() => handleUnFollow(user?.id, setFollowersUsers)}
                                                      className="">Suivis</span>
                                        )}
                                </div>
                                <div
                                    className="flex gap-2 items-center rounded-lg bg-gray-400 text-white px-3 py-2 cursor-pointer">
                                    <FaEdit/>
                                    {user?.id === userConnected?.id ? <span className="">Edit Profile</span> :
                                        <span className="">Message</span>}
                                </div>
                                <div className="rounded-lg bg-gray-400 text-white px-3 py-3 cursor-pointer">
                                    <FaChevronDown/>
                                </div>

                            </div>
                        </div>

                        <hr className="bg-gray-400 h-[2px] my-4 "/>

                        {/*Petite navigation*/}
                        <div className="flex justify-between items-center py-3 px-4 sm:px-0   ">
                            <div className="flex items-center gap-4 ">
                                <p>Posts</p>
                                <p>About</p>
                                <p className="hidden sm:block">Friends</p>
                                <p className="hidden sm:block">Photos</p>
                                <p className="hidden sm:block">Videos</p>
                                <p className="hidden sm:block">Check-ins</p>
                                <p>More</p>
                            </div>
                            <div className="rounded-lg bg-gray-300  px-3 py-2 cursor-pointer ">
                                <FaEllipsisH/>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className=" mt-4 mx- sm:mx-[8%] flex flex-col sm:flex-row gap-5">

                <div className="w-full sm:w-[40%] sm:sticky sm:top-0 sm:self-start flex flex-col gap-3 ">
                    <div className="bg-white flex flex-col gap-5 p-4 ">
                        <h1 className="font-semibold text-xl">Intro</h1>
                        {user?.id === userConnected?.id &&
                            <button className=" bg-gray-200 w-full rounded py-1">Add bio</button>}
                        <p>lives in Quebec, Quebec</p>
                        {user?.id === userConnected?.id &&
                            <button className=" bg-gray-200 w-full rounded py-1">Add details</button>}
                        {user?.id === userConnected?.id &&
                            <button className=" bg-gray-200 w-full rounded py-1">Add featured</button>}
                    </div>

                    <div className="bg-white flex justify-between p-4 ">
                        <button className="font-semibold text-xl ">Photos</button>
                        <a className=" ">See All photos</a>
                    </div>

                    <div className="bg-white p-4 h-56 ">
                        <div className="flex justify-between">
                            <h1 className=" font-semibold text-xl ">Friends</h1>
                            <a className=" ">See all friends</a>
                        </div>

                    </div>

                    <div className="bg-white p-4 h-96 ">
                        <div className="flex justify-between">
                            <h1 className=" font-semibold text-xl ">Life events</h1>
                            <a className=" ">See all </a>
                        </div>

                    </div>

                </div>

                {/*posts user connected*/}
                <div className="sm:flex-1 ">
                    <FormPost photoProfileUserConnected={photoProfileUserConnected}/>
                    {isLoading ? "Chargement..." :
                        <PostItem posts={postsUser} likedPosts={likedPosts} setLikedPosts={setLikedPosts}
                                  idUserConnected={userConnected?.id}
                                  followersUsers={followersUsers} setFollowersUsers={setFollowersUsers}
                                  photoProfileUserConnected={photoProfileUserConnected}/>}
                </div>

            </div>

            <div className="w-full mx-auto sm:mx-[8%]">
                <p className="text-xs p-2">Privacy . Terms . Advertising . Add Choices . Cookies . More . Frank @
                    2025</p>
            </div>

        </div>
    )
}

export default Profile
