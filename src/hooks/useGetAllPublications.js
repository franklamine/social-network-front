import {useEffect, useState} from "react";
import {customAxios} from "../api/httpClients.js";
import {toast} from "react-toastify";

export const useGetAllPublications = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        customAxios
            .get("publications")
            .then((response) => {
                setPosts(response.data);
            })
            .catch(() => {
                toast.error("Impossible de charger les publications.");
            })
            .finally(() => setIsLoading(false));
    }, []);

    return {posts, isLoading};
}