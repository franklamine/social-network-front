import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {StoreContext} from "../context/StoreContext.jsx";
import customAxios from "../api/customAxios.js";


export default function FormPublication() {

    const { getPublications } = useContext(StoreContext);

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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-2xl shadow-lg space-y-4 max-w-3xl mx-auto mb-6"
        >
                    <textarea
                        {...register("message", {required: true})}
                        className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
                        placeholder="Quoi de neuf ?"
                        rows={1}
                    />
            {errors.message && <p className="text-red-500">Le message est obligatoire.</p>}

            <div className="flex items-center gap-4">
                <label className="cursor-pointer">
                            <span
                                className="inline-block w-10 h-10 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-full flex items-center justify-center text-xl">📷</span>
                    <input type="file" accept="image/*" multiple {...register("photos")} className="hidden"/>
                </label>

                <label className="cursor-pointer">
                            <span
                                className="inline-block w-10 h-10 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-full flex items-center justify-center text-xl">🎥</span>
                    <input type="file" accept="video/*" {...register("video")} className="hidden"/>
                </label>

                <button
                    type="submit"
                    className="ml-auto bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:opacity-90"
                >
                    Publier
                </button>
            </div>
        </form>
    )
}