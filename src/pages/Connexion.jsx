import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {useContext, useEffect} from "react";
import {StoreContext} from "../context/StoreContext.jsx";

function Connexion() {

    const {navigate,accessToken, setAccessToken} = useContext(StoreContext);
    
    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    },[accessToken, navigate])

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {

            const response = await  axios.post("http://api-social-network:8081/frank-api/utilisateurs/connexion", data)

            if (response.status === 200) {

                localStorage.setItem("token", JSON.stringify({
                    "accessToken": response.data.accessToken,
                    "refreshToken": response.data.refreshToken
                }));

                setAccessToken(response.data.accessToken);
                navigate("/");
            }

        }catch(err) {
            const message = err.response?.data?.message || "Erreur inattendue";
            toast.error(message, {position: "top-center"});
            reset({
                ...data,
                motDePasse: "",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#4679af]">
            <div className="w-full max-w-md bg-[#f9fafb] rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-[#0d1b2a] mb-6">
                    Connexion
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            {...register("email", {
                                required: "Veillez saisir email",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Adresse email invalide",
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>)}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            {...register("motDePasse", {
                                required: "Veillez saisir votre mot de passe",
                                minLength: {
                                    value: 4,
                                    message:
                                        "Veillez saisir un mot de passe de plus de 6 caracteres",
                                },
                            })}
                        />
                        {errors.motDePasse && (
                            <span className="text-red-500 text-sm">{errors.motDePasse.message}</span>)}
                    </div>

                    <p className="text-sm text-right text-blue-600 hover:underline cursor-pointer">
                        <Link to="/mot-de-passe-oublier">
                            Mot de passe oublié ?
                        </Link>
                    </p>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Se connecter
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Pas encore de compte ?{" "}
                    <Link
                        to="/inscription"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        S'inscrire
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Connexion;
