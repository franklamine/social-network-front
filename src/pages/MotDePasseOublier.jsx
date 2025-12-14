import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function MotDePasseOublier() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        axios.post("/frank-api/utilisateurs/mot-de-passe-oublier", data)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    toast.success(response.data , {
                        position: "top-center",
                    });
                    navigate("/nouveau-mot-de-passe")
                }
            }).catch((error) => {
                console.log(error);
                const message = error.response?.data?.message || "Erreur lors de l'envoi";
                toast.error(message, { position: "top-center" });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#4679af]">
            <div className="w-full max-w-md bg-[#f9fafb] rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Mot de passe oublié</h2>
                <p className="text-sm text-center text-gray-600 mb-6">
                    Entrez votre adresse email. Vous recevrez un code de vérification.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Email requis",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Adresse email invalide",
                                },
                            })}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
                    >
                        Envoyer le code
                    </button>
                </form>

                <div className="mt-6 text-sm text-center text-gray-600 space-y-2">
                    <p>
                        <Link to="/connexion" className="text-blue-600 hover:underline font-medium">
                            Retour à la connexion
                        </Link>
                    </p>

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
        </div>
    );
}

export default MotDePasseOublier;
