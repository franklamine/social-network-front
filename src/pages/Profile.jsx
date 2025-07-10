import React, {useContext} from 'react'
import Navbar from "../components/Navbar.jsx";
import {StoreContext} from "../context/StoreContext.jsx";
import {FaCamera, FaChevronDown, FaEdit, FaEllipsisH, FaPlus} from "react-icons/fa";
import customAxios from "../api/customAxios.js";
import {useForm} from "react-hook-form";

function Profile() {

    const {connectedUser, getConnectedUser, posts, getAllPost} = useContext(StoreContext);

    const photoProfile = connectedUser?.profile?.photoProfile;
    const photoCouverture = connectedUser?.profile?.photoCouverture;

    const {
        register,
        handleSubmit,
        formState: {errors},
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
                getConnectedUser();
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
                getConnectedUser();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="shadow-lg">
                <div className="relative mt-14 mx-auto sm:mx-[8%]">

                    {/*block photo de couverture*/}
                    <div className="h-52 sm:h-96 w-full sm:rounded-lg bg-gray-200">
                        {photoCouverture &&
                            <img className="w-full rounded-lg h-96 object-cover" src={photoCouverture} alt=""/>}
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
                        <form onSubmit={handleSubmit(handlePhotoCouverture)}
                              className="absolute top-32 right-8 sm:top-80 sm:right-8 z-10 flex gap-2 items-center rounded-lg bg-white text-gray-700 px-6 py-3 sm:px-3 sm:py-2 ">
                            <label className="cursor-pointer">
                                <input type="file" accept="image/*"  {...register("photoCouv")} className="hidden"/>
                                <FaCamera className="w-7 h-7 sm:w-auto sm:h-auto"/>
                            </label>
                            <button type="submit" className="hidden sm:block">Edit Cover photo</button>
                        </form>

                        {/*block edition photo de profile */}
                        <form onSubmit={handleSubmit(handlePhotoProfile)}
                              className="absolute h-14 w-14 rounded-full top-56 right-36 sm:top-[440px] sm:left-36 z-20 flex items-center justify-center bg-white text-gray-700 ">
                            <label className="cursor-pointer">
                                <input type="file" accept="image/*"  {...register("photoProf")} className="hidden"/>
                                <FaCamera className=" w-7 h-7"/>
                            </label>
                            <button type="submit" className="hidden sm:block">SE</button>
                        </form>


                        <div
                            className=" sm:ml-[210px] sm:mr-[20px] mt-20 sm:mt-6 flex flex-col sm:flex-row justify-between items-center">
                            <div className="my-5 sm:my-0">
                                <p className="font-bold text-3xl">{connectedUser.nom}{" "}{connectedUser.prenom}</p>
                                <p className="text-center sm:text-start">2 friends</p>
                            </div>
                            <div className="flex items-center gap-4 ">
                                <div
                                    className="flex gap-2 items-center rounded-lg bg-blue-500 text-white px-3 py-2 cursor-pointer">
                                    <FaPlus/>
                                    <span>Add to Story</span>
                                </div>
                                <div
                                    className="flex gap-2 items-center rounded-lg bg-gray-400 text-white px-3 py-2 cursor-pointer">
                                    <FaEdit/>
                                    <span className="">Edit Profile</span>
                                </div>
                                <div className="rounded-lg bg-gray-400 text-white px-3 py-3 cursor-pointer">
                                    <FaChevronDown/>
                                </div>

                            </div>
                        </div>

                        <hr className="bg-gray-400 h-[2px] my-4 "/>

                        <div className="flex justify-between items-center py-3   ">
                            <div className="flex items-center gap-4 ">
                                <p>Posts</p>
                                <p>About</p>
                                <p>Friends</p>
                                <p>Photos</p>
                                <p>Videos</p>
                                <p>Check-ins</p>
                                <p>More</p>
                            </div>
                            <div className="rounded-lg bg-gray-300  px-3 py-2 cursor-pointer ">
                                <FaEllipsisH/>
                            </div>

                        </div>

                    </div>

                </div>


            </div>

        </div>
    )
}

export default Profile
