import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";

function Inscription() {
    const navigate = useNavigate(); // Initialisation de useNavigate

    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        reset,
    } = useForm();

    const onSubmit = (data) => {
        axios.post("/frank-api/utilisateurs/inscription", data)
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    toast.success(response.data, {position: "top-center"});
                    navigate("/activation");
                }
            }).catch((error) => {
                console.log(error);
            const message = error.response?.data?.message || "Erreur inattendue";
            toast.error(message, {position: "top-center"});
            // Réinitialiser les champs de mot de passe si l'enregistrement échoue
            reset({
                ...data,
                motDePasse: "",
                motDePasseConfirmation: "",
            });
        })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#4679af]">
            <div className="w-full max-w-md bg-[#f9fafb] rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-[#0d1b2a] mb-6">
                    Créer un compte
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label
                            htmlFor="nom"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nom
                        </label>
                        <input
                            type="text"
                            id="nom"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            {...register("nom", {
                                required: "Veillez saisir un nom",
                                minLength: {
                                    value: 5,
                                    message: "Veillez saisir un nom de plus de 5 caracteres",
                                },
                            })}
                        />
                        {errors.nom && (
                            <span className="text-red-500 text-sm">{errors.nom.message}</span>)}
                    </div>

                    <div>
                        <label
                            htmlFor="prenom"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Prénom
                        </label>
                        <input
                            type="text"
                            id="prenom"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            {...register("prenom", {
                                required: "Veillez saisir un prénom",
                                minLength: {
                                    value: 5,
                                    message: "Veillez saisir un prénom de plus de 5 caracteres",
                                },
                            })}
                        />
                        {errors.prenom && (
                            <span className="text-red-500 text-sm">{errors.prenom.message}</span>)}
                    </div>

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

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirmer le mot de passe
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            {...register("motDePasseConfirmation", {
                                required: "Veillez saisir votre mot de passe",
                                minLength: {
                                    value: 4,
                                    message:
                                        "Veillez saisir un mot de passe de plus de 6 caracteres",
                                },
                                validate: (value) =>
                                    value === getValues("motDePasse") || "Les mots de passe ne correspondent pas",
                            })}
                        />
                        {errors.motDePasseConfirmation && (
                            <span className="text-red-500 text-sm">{errors.motDePasseConfirmation.message}</span>)}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        S’inscrire
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Déjà inscrit ?{" "}
                    <Link
                        to="/connexion"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Inscription;
