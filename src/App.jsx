import "./App.css";
import {Route, Routes} from "react-router-dom";
import HomeLayout from "./pages/HomeLayout.jsx";
import Connexion from "./pages/Connexion.jsx";
import Inscription from "./pages/Inscription.jsx";
import Activation from "./pages/Activation.jsx";
import MotDePasseOublier from "./pages/MotDePasseOublier.jsx";
import NouveauMotDePasse from "./pages/NouveauMotDePasse.jsx";
import Friend from "./pages/Friend.jsx";
import Video from "./pages/Video.jsx";
import Game from "./pages/Game.jsx";
import GlobalPost from "./pages/GlobalPost.jsx";
import ProfileLayout from "./pages/ProfileLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import About from "./pages/About.jsx";
import Photos from "./pages/Photos.jsx";
import UserPost from "./pages/UserPost.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<HomeLayout/>}>
                <Route index element={<GlobalPost/>}/>
                <Route path="friends" element={<Friend/>}/>
                <Route path="video" element={<Video/>}/>
                <Route path="game" element={<Game/>}/>
            </Route>

            <Route path="/profile/:id" element={<ProfileLayout/>}>
                <Route index element={<UserPost/>}/>
                <Route path="about" element={<Friend/>}/>
                <Route path="friends" element={<Friend/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="Photos" element={<Photos/>}/>
                <Route path="videos" element={<Video/>}/>
                <Route path="videos" element={<Video/>}/>
            </Route>

            <Route path="/connexion" element={<Connexion/>}/>
            <Route path="/inscription" element={<Inscription/>}/>
            <Route path="/activation" element={<Activation/>}/>
            <Route path="/mot-de-passe-oublier" element={<MotDePasseOublier/>}/>
            <Route path="/nouveau-mot-de-passe" element={<NouveauMotDePasse/>}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    );
}

export default App;
