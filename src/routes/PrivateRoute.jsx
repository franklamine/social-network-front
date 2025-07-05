import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext.jsx";

const PrivateRoute = ({ children }) => {
    const { accessToken, isValidAccessToken, authLoading } = useContext(StoreContext);
    const isAuthenticated = accessToken && isValidAccessToken;

    if (authLoading) {
        return <div>Loading...</div>; // ou ton spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/connexion" replace />;
    }

    return children;
};

export default PrivateRoute;
