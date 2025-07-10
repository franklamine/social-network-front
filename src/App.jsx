 import "./App.css";
import {Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Connexion from "./pages/Connexion.jsx";
import Inscription from "./pages/Inscription.jsx";
import Activation from "./pages/Activation.jsx";
import MotDePasseOublier from "./pages/MotDePasseOublier.jsx";
import NouveauMotDePasse from "./pages/NouveauMotDePasse.jsx";
 import Friend from "./pages/Friend.jsx";
 import Video from "./pages/Video.jsx";
 import Game from "./pages/Game.jsx";
 import Home from "./pages/Home.jsx";
 import Profile from "./pages/Profile.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="friends" element={<Friend />} />
                <Route path="video" element={<Video />} />
                <Route path="game" element={<Game />} />
            </Route>

            <Route path="profile" element={<Profile />} />

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
