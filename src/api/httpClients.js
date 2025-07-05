import axios from "axios";

export const customAxios = axios.create({
    baseURL:  "http://localhost:8081/frank-api",
})

customAxios.interceptors.request.use((config) => {
        const tokensData = JSON.parse(localStorage.getItem("token"));
    if (tokensData) {
        config.headers.Authorization = `Bearer ${tokensData.accessToken}`;
    }
    return config;
}, (error) => Promise.reject(error)
);

customAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

        try {
            const tokens = JSON.parse(localStorage.getItem("token"));

            const res = await axios.post("http://localhost:8081/frank-api/utilisateurs/refresh-token", {
                token: tokens.refreshToken,
            });

            // Met à jour le localStorage
            const nouveauToken = res.data.accessToken;
            tokens.accessToken = nouveauToken;
            localStorage.setItem("token", JSON.stringify(tokens));

            // Met à jour le header Authorization pour la requête initiale
            customAxios.defaults.headers.common["Authorization"] = `Bearer ${nouveauToken}`;
            originalRequest.headers.Authorization = `Bearer ${nouveauToken}`;

            // Réexécute la requête initiale
            return customAxios(originalRequest);
        } catch (e) {
            localStorage.removeItem("token");
            // window.location.href = "/connexion";
            return Promise.reject(e);
        }
        }
        return Promise.reject(error);
    }
);

