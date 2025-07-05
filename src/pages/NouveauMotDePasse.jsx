import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";

function NouveauMotDePasse() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        reset,
    } = useForm();

    const motDePasse = watch("nouveauMotDePasse");

    const onSubmit = (data) => {
        axios.post("http://localhost:8081/frank-api/utilisateurs/nouveau-mot-de-passe", data)
            .then((response) => {
                if (response.status === 200) {
                    toast.success(response.data, {position: "top-center"});
                    navigate("/connexion");
                }
            })
            .catch((error) => {
                const message = error.response?.data?.message || "Échec de la réinitialisation.";
                toast.error(message, {position: "top-center"});
                reset({code: "", nouveauMotDePasse: "", confirmationMotDePasse: ""});
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#4679af]">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#0d1b2a]">
                    Réinitialiser le mot de passe
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    <div>
                        <label htmlFor="nouveauMotDePasse" className="block text-sm font-medium text-gray-700">
                            Nouveau mot de passe
                        </label>
                        <input
                            type="password"
                            id="nouveauMotDePasse"
                            {...register("nouveauMotDePasse", {
                                required: "Mot de passe requis",
                                minLength: {
                                    value: 4,
                                    message: "Minimum 4 caractères",
                                },
                            })}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.nouveauMotDePasse && (
                            <span className="text-red-500 text-sm">{errors.nouveauMotDePasse.message}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmationMotDePasse" className="block text-sm font-medium text-gray-700">
                            Confirmer le mot de passe
                        </label>
                        <input
                            type="password"
                            id="confirmationMotDePasse"
                            {...register("confirmationMotDePasse", {
                                required: "Veuillez confirmer le mot de passe",
                                validate: value =>
                                    value === motDePasse || "Les mots de passe ne correspondent pas",
                            })}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.confirmationMotDePasse && (
                            <span className="text-red-500 text-sm">
                                {errors.confirmationMotDePasse.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                            Code reçu par email
                        </label>
                        <input
                            type="number"
                            id="code"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                            {...register("code", {
                                required: "Veuillez entrer le code d'activation",
                                minLength: {
                                    value: 6,
                                    message: "Le code doit contenir au moins 6 chiffres",
                                },
                            })}
                        />
                        {errors.code && (
                            <span className="text-red-500 text-sm">{errors.code.message}</span>
                        )}
                    </div>
                    <p className="text-sm text-center text-gray-600 mt-6">
                        Vous avez oubliez votre code?{" "}
                        <Link
                            to="/mot-de-passe-oublier"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Demander un nouveau code
                        </Link>
                    </p>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
                    >
                        Réinitialiser
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NouveauMotDePasse;
