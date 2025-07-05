import {toast} from "react-toastify";
import {customAxios} from "../api/httpClients.js";


export const logout = (navigate, setAccessToken) => {

    customAxios
        .post("/utilisateurs/deconnexion", {
            token: JSON.parse(localStorage.getItem("token")).refreshToken,
        })
        .then((response) => {
            if (response.status === 200) {
                localStorage.removeItem("token");
                setAccessToken("");
                navigate("/connexion");
                toast.success(response.data, {position: "top-center"});
            }
        })
        .catch((error) => {
            console.log(error);
        });
};


