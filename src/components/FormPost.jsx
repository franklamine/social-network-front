import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {StoreContext} from "../context/StoreContext.jsx";
import customAxios from "../api/customAxios.js";
import {FaVideo} from "react-icons/fa6";
import {FaPaperPlane, FaPhotoVideo, FaSmile} from "react-icons/fa";


export default function FormPost() {

    const {getPublications} = useContext(StoreContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();


    const onSubmit = (data) => {
        console.log(data);
        if (!data.message.trim()) {
            toast.error("La description est obligatoire");
            return;
        }

        const formData = new FormData();
        formData.append("message", data.message);

        if (data.photos && data.photos.length > 0) {
            formData.append("photo", data.photos[0]);
        }

        if (data.video && data.video.length > 0) {
            formData.append("video", data.video[0]);
        }

        customAxios
            .post("publications/publier", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                getPublications();
                toast.success("Publication réussie !");
                reset();
            })
            .catch((error) => {
                console.error(error);
                toast.error("Erreur lors de la publication.");
            });
    };

    return (
        <>
            <form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 bg-white rounded-2xl p-4 mb-5">
                <div className="flex items-center gap-4">
                    <img className="w-10 h-10 rounded-full object-cover" src="logo-min.png" alt=""/>
                    <textarea
                        {...register("message")}
                        className="rounded-2xl flex-1 bg-gray-200  p-2 text-gray-400  resize-none focus:outline-none "
                        placeholder=" What's on your mind, Frank?"
                        rows={1}
                    />
                    <button type="submit">
                        <FaPaperPlane className="text-green-500  h-8 w-8"/>
                    </button>
                </div>
                <hr className="bg-gray-200 h-[2px] "/>
                <div className="flex items-center justify-around ">
                    <label
                        className="flex items-center gap-2 px-10 py-2 rounded-lg hover:bg-gray-200 transition duration-200 cursor-pointer">
                        <FaVideo className="text-red-500"/>
                        <p>Video</p>
                        <input type="file" accept="video/*" multiple {...register("video")} className="hidden"/>
                    </label>
                    <label
                        className="flex items-center gap-2 px-10 py-2 rounded-lg hover:bg-gray-200 transition duration-200 cursor-pointer">
                        <FaPhotoVideo className="text-green-500"/>
                        <p>Photo</p>
                        <input type="file" accept="image/*" multiple {...register("photos")} className="hidden"/>
                    </label>
                    <div
                        className="flex items-center gap-2 px-10 py-2 rounded-lg hover:bg-gray-200 transition duration-200 cursor-pointer">
                        <FaSmile className="text-yellow-500"/>
                        <p>Feeling/activity</p>
                    </div>
                </div>
            </form>

        </>
    )
}