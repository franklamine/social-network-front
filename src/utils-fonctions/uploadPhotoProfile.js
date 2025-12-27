import customAxios from "../api/customAxios.js";

export const uploadPhotoProfile = async (file, getUserById, id) => {
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