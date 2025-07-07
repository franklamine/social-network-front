 import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Connexion from "./pages/Connexion.jsx";
import Inscription from "./pages/Inscription.jsx";
import Activation from "./pages/Activation.jsx";
import MotDePasseOublier from "./pages/MotDePasseOublier.jsx";
import NouveauMotDePasse from "./pages/NouveauMotDePasse.jsx";
 import PrivateRoute from "./routes/PrivateRoute.jsx";
 import Friend from "./pages/Friend.jsx";
 import Video from "./pages/Video.jsx";
 import Game from "./pages/Game.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/activation" element={<Activation />} />
            <Route path="/mot-de-passe-oublier" element={<MotDePasseOublier />} />
            <Route path="/nouveau-mot-de-passe" element={<NouveauMotDePasse />} />
            <Route path="/friends" element={<Friend />} />
            <Route path="/video" element={<Video />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    );
}

export default App;
