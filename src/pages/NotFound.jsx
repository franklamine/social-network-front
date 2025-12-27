import {FaHome, FaSearch} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">

                {/* Icône */}
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-100 text-blue-500 p-4 rounded-full">
                        <FaSearch className="w-8 h-8"/>
                    </div>
                </div>

                {/* Titre */}
                <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Page introuvable
                </h2>

                {/* Texte */}
                <p className="text-gray-500 mb-6">
                    Oups 😅 La page que vous cherchez n’existe pas ou a été déplacée.
                </p>

                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-200"
                    >
                        <FaHome/>
                        Accueil
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition duration-200"
                    >
                        Retour
                    </button>
                </div>

            </div>
        </div>
    );
}
