import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {useState} from "react";

function Activation() {
    const navigate = useNavigate();
    const [afficherLienRenvoyer, setAfficherLienRenvoyer] = useState(false);
    const emailActivationUtilisateur = localStorage.getItem("emailActivationUtilisateur");


    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();

    const onSubmit = (data) => {
        axios.post("/frank-api/utilisateurs/activation", data)
            .then((response) => {
                if (response.status === 200) {
                    toast.success(response.data, {position: "top-center"});
                    navigate("/connexion");
                }
            })
            .catch((error) => {
                const message = error.response?.data?.message || "Code invalide ou expiré.";
                toast.error(message, {position: "top-center"});
                setAfficherLienRenvoyer(true);
                reset({code: ""});
            });
    };

    const demanderNouveauCode = async () => {
        try {
            const res = await axios.post("/frank-api/utilisateurs/nouveau-code", {email: emailActivationUtilisateur});
            if(res.status === 200) {
                toast.success("Un nouveau code a été envoyé à votre email.", {position: "top-center"});
                setAfficherLienRenvoyer(false)
            }

        } catch (error) {
            const message = error.response?.data?.message || "Erreur lors de l’envoi du code.";
            toast.error(message, {position: "top-center"});
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#4679af]">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-[#0d1b2a] mb-6">
                    Activation du Compte
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
                    >
                        Activer le compte
                    </button>
                </form>

                {afficherLienRenvoyer && (
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 mb-2">
                            Code invalide ? Demandez un nouveau code :
                        </p>
                        <button
                            onClick={demanderNouveauCode}
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Renvoyer un nouveau code
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Activation;
