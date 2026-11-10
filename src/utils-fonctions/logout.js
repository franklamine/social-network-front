import {toast} from "react-toastify";
import axios from "axios";


export const logout = async (navigate, setAccessToken) => {

    const tokens = JSON.parse(localStorage.getItem("token") || "null");

    try {
        if (tokens?.refreshToken) {
            // const response = await axios.post("http://localhost:8081/frank-api/utilisateurs/deconnexion", {token: tokens.refreshToken,});
            const response = await axios.post("/frank-api/utilisateurs/deconnexion", {token: tokens.refreshToken,});

            if (response.status === 200) {
                localStorage.removeItem("token");
                setAccessToken("");
                navigate("/connexion", {replace: true});
                toast.success(response.data, {position: "top-center"});
            }
        }

    } catch (error) {
        console.log(error);
    }
};


