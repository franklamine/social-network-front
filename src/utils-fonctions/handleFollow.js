import customAxios from "../api/customAxios.js";


export const handleFollow = async (idAuteur, setFollowersUsers) => {
    try {
        const res = await customAxios.post("utilisateurs/" + idAuteur + "/follow");
        if (res.status === 200) {
            setFollowersUsers((prev) => ({...prev, [idAuteur]: true}));
        }
    } catch (err) {
        console.log(err);
    }
}