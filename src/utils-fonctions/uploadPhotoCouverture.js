import customAxios from "../api/customAxios.js";

export const uploadPhotoCouverture = async (file, getUserById, id) => {
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
