 import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Connexion from "./pages/Connexion.jsx";
import Inscription from "./pages/Inscription.jsx";
import Activation from "./pages/Activation.jsx";
import MotDePasseOublier from "./pages/MotDePasseOublier.jsx";
import NouveauMotDePasse from "./pages/NouveauMotDePasse.jsx";
 import PrivateRoute from "./routes/PrivateRoute.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/activation" element={<Activation />} />
            <Route path="/mot-de-passe-oublier" element={<MotDePasseOublier />} />
            <Route path="/nouveau-mot-de-passe" element={<NouveauMotDePasse />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    );
}

export default App;
