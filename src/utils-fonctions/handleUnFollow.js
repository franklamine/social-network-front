import customAxios from "../api/customAxios.js";

export const handleUnFollow = async (idAuteur, setFollowersUsers) => {
    try {
        const res = await customAxios.post("utilisateurs/" + idAuteur + "/unfollow");
        if (res.status === 200) {
            setFollowersUsers((prev) => ({...prev, [idAuteur]: false}));
        }
    } catch (err) {
        console.log(err);
    }
}
