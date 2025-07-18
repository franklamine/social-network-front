import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StoreContextProvider>
            <ToastContainer/>
            <App/>
        </StoreContextProvider>
    </BrowserRouter>,
)
