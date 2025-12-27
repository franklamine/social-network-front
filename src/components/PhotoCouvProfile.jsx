import {FaCamera, FaChevronDown, FaEdit, FaEllipsisH, FaPlus} from "react-icons/fa";
import {handleFollow} from "../utils-fonctions/handleFollow.js";
import {handleUnFollow} from "../utils-fonctions/handleUnFollow.js";
import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {uploadPhotoProfile} from "../utils-fonctions/uploadPhotoProfile.js";
import {uploadPhotoCouverture} from "../utils-fonctions/uploadPhotoCouverture.js";


function PhotoCouvProfile({
                              id,
                              getUserById,
                              photoCouverture,
                              photoProfile,
                              user,
                              userConnected,
                              followersUsers,
                              setFollowersUsers
                          }) {

    useEffect(() => {
        getUserById(id);
    }, [id]);


    return (
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
                                    onChange={(e) => uploadPhotoCouverture(e.target.files[0], getUserById, id)}
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
                                    onChange={(e) => uploadPhotoProfile(e.target.files[0], getUserById, id)}
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
                            <NavLink to={`/profile/${id}`} end>Posts</NavLink>
                            <NavLink to="/about">About</NavLink>
                            <NavLink to={`/profile/${id}/friends`} className="hidden sm:block">Friends</NavLink>
                            <NavLink to={`/profile/${id}/Photos`} className="hidden sm:block">Photos</NavLink>
                            <NavLink to={`/profile/${id}/videos`} className="hidden sm:block">Videos</NavLink>
                            <NavLink to="/check-ins" className="hidden sm:block">Check-ins</NavLink>
                            <NavLink to="/wdwd">More</NavLink>
                        </div>
                        <div className="rounded-lg bg-gray-300  px-3 py-2 cursor-pointer ">
                            <FaEllipsisH/>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default PhotoCouvProfile;