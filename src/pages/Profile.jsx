import React, {useContext, useEffect} from 'react'
import Navbar from "../components/Navbar.jsx";
import {StoreContext} from "../context/StoreContext.jsx";
import {FaCamera, FaChevronDown, FaEdit, FaEllipsisH, FaPlus} from "react-icons/fa";
import customAxios from "../api/customAxios.js";
import {useForm} from "react-hook-form";
import FormPost from "../components/FormPost.jsx";
import PostItem from "../components/PostItem.jsx";
import {useParams} from "react-router-dom";

function Profile() {

    const {id} = useParams();

    const {user, userConnected, getUserById, posts, isLoading } = useContext(StoreContext);

    const postsUser = posts.filter(post => post.auteurPublication === user.nom + " " + user.prenom)

    const photoProfile = user?.profile?.photoProfile;
    const photoProfileUserConnected = userConnected?.photoProfileUserConnected;

    const photoCouverture = user?.profile?.photoCouverture;

    const {
        register,
        handleSubmit,
    } = useForm();

    const handlePhotoCouverture = async (dataCouverture) => {

        const formData = new FormData();

        if (dataCouverture.photoCouv && dataCouverture.photoCouv.length > 0) {
            formData.append("photoCouverture", dataCouverture.photoCouv[0]);
        }

        try {
            const res = customAxios.post("/profile/photo-couverture",
                formData, {headers: {"Content-Type": "multipart/form-data",}})
            console.log("response", res)
            if((await res).status === 201) {
                getUserById(id);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handlePhotoProfile = async (dataProfile) => {

        const formData = new FormData();
        if (dataProfile.photoProf && dataProfile.photoProf.length > 0) {
            formData.append("photoProfile", dataProfile.photoProf[0]);
        }

        try {
            const res = customAxios.post("/profile/photo-profile",
                formData, {headers: {"Content-Type": "multipart/form-data",}})
            console.log(res)
            if((await res).status === 201) {
                getUserById(id);
            }
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getUserById(id);
    }, [id]);

    return (
        <div className=" bg-gray-200">
            <Navbar/>
            <div className="bg-white shadow-lg">
                <div className="relative mt-14 mx-auto sm:mx-[8%]">

                    {/*block photo de couverture*/}
                    <div className="h-52 sm:h-96 w-full sm:rounded-b-lg bg-gray-200">
                        {photoCouverture &&
                            <img className="h-52 sm:h-96 w-full sm:rounded-lg  object-cover" src={photoCouverture} alt=""/>}
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

                        {/*block edition photo de couverture  */}
                        {user?.id === userConnected?.id && (
                            <form onSubmit={handleSubmit(handlePhotoCouverture)}
                                  className="absolute top-32 right-8 sm:top-80 sm:right-8 z-10 flex gap-2 items-center rounded-lg bg-white text-gray-700 px-6 py-3 sm:px-3 sm:py-2 ">
                                <label className="cursor-pointer">
                                    <input type="file" accept="image/*"  {...register("photoCouv")} className="hidden"/>
                                    <FaCamera className="w-7 h-7 sm:w-auto sm:h-auto"/>
                                </label>
                                <button type="submit" className="hidden sm:block">Edit Cover photo</button>
                            </form>
                        )}

                        {/*block edition photo de profile */}
                        {user?.id === userConnected?.id && (
                            <form onSubmit={handleSubmit(handlePhotoProfile)}
                                  className="absolute h-14 w-14 rounded-full top-56 right-36 sm:top-[440px] sm:left-36 z-20 flex items-center justify-center bg-white text-gray-700 ">
                                <label className="cursor-pointer">
                                    <input type="file" accept="image/*"  {...register("photoProf")} className="hidden"/>
                                    <FaCamera className=" w-7 h-7"/>
                                </label>
                                <button type="submit" className="hidden sm:block">SE</button>
                            </form>
                        )}

                        {/*Infos profiles*/}
                        <div
                            className=" sm:ml-[210px] sm:mr-[20px] mt-20 sm:mt-6 flex flex-col sm:flex-row justify-between items-center">
                            <div className="my-5 sm:my-0">
                                <div className="font-bold text-3xl">{user.nom}{" "}{user.prenom}</div>
                                <div className="flex gap-5">
                                    <p className="sm:text-start">556 Suivis</p>
                                    <p className="sm:text-start">224 Followers</p>
                                    <p className="sm:text-start">22 Likes</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 ">
                                <div
                                    className="flex gap-2 items-center rounded-lg bg-blue-500 text-white px-3 py-2 cursor-pointer">
                                    <FaPlus/>
                                    {user?.id === userConnected?.id ? <span className="">Add to story</span> : <span className="">Follow</span> }
                                </div>
                                <div
                                    className="flex gap-2 items-center rounded-lg bg-gray-400 text-white px-3 py-2 cursor-pointer">
                                    <FaEdit/>
                                    {user?.id === userConnected?.id ? <span className="">Edit Profile</span> : <span className="">Message</span> }
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

            <div className="mt-4 mx-auto sm:mx-[8%] flex gap-5">

                <div className="w-[40%] sticky top-0 self-start flex flex-col gap-5 ">
                    <div className="bg-white rounded-xl flex flex-col gap-5 p-4 ">
                        <h1 className="font-semibold text-xl">Intro</h1>
                        {user?.id === userConnected?.id && <button className=" bg-gray-200 w-full rounded py-1">Add bio</button>}
                        <p>lives in Quebec, Quebec</p>
                        {user?.id === userConnected?.id && <button className=" bg-gray-200 w-full rounded py-1">Add details</button>}
                        {user?.id === userConnected?.id && <button className=" bg-gray-200 w-full rounded py-1">Add featured</button>}
                    </div>

                    <div className="bg-white rounded-xl flex justify-between p-4 ">
                        <button  className="font-semibold text-xl " >Photos</button>
                        <a  className=" ">See All photos</a>
                    </div>

                    <div className="bg-white rounded-xl p-4 h-56 ">
                        <div className="flex justify-between">
                            <h1  className=" font-semibold text-xl " >Friends</h1>
                            <a  className=" ">See all friends</a>
                        </div>

                    </div>

                    <div className="bg-white rounded-xl p-4 h-96 ">
                        <div className="flex justify-between">
                            <h1  className=" font-semibold text-xl " >Life events</h1>
                            <a  className=" ">See all </a>
                        </div>

                    </div>

                </div>

                {/*posts user connected*/}
                <div className="flex-1 ">
                    <FormPost photoProfileUserConnected={photoProfileUserConnected} />
                    {isLoading ? "Chargement..." : <PostItem posts={postsUser} photoProfile={photoProfile} />}
                </div>

            </div>

            <div className=" mx-auto sm:mx-[8%]">
                <p className="text-xs p-2">Privacy . Terms . Advertising . Add Choices . Cookies . More . Frank @ 2025</p>
            </div>

        </div>
    )
}

export default Profile
