import React, {useContext} from 'react'
import {useForm} from "react-hook-form";
import customAxios from "../api/customAxios.js";
import {toast} from "react-toastify";
import {FaPaperPlane} from "react-icons/fa";
import {StoreContext} from "../context/StoreContext.jsx";

function FormComment({postId}) {

    const {getAllPost} = useContext(StoreContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();

    const onsubmit = async (data) => {
        try {
            const res = await customAxios.post("comment/add", {
                message: data.message,
                PublicationId: postId,
            })
            if (res.status === 201) {
                toast.success("Comment successfully added");
                reset();
                getAllPost();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex gap-2 p-3 ">
            <img className="w-10 h-10 rounded-full object-cover" src="logo-min.png" alt=""/>
            <form onSubmit={handleSubmit(onsubmit)} className="flex-1">
                <div className="bg-gray-200 rounded-lg relative ">
                        <textarea {...register("message")}
                                  className="w-full rounded-lg  bg-gray-200  p-2 text-gray-400  resize-none focus:outline-none "
                                  placeholder="Write a public Comment..."
                                  rows={2}/>
                    <button type="submit" className="absolute bottom-4 right-4 ">
                        <FaPaperPlane className=""/>
                    </button>
                </div>

            </form>
        </div>
    )
}

export default FormComment
