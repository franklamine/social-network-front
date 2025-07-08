import React, {useContext, useEffect} from 'react'
import FormPublication from "../components/FormPublication.jsx";
import Publications from "../components/Publications.jsx";
import {StoreContext} from "../context/StoreContext.jsx";

function Home() {
    const {navigate, accessToken, publications, isLoading, getPublications} = useContext(StoreContext);


    useEffect(() => {
        if (accessToken) {
            getPublications();
        }
    }, [accessToken]);

    return (
        <div>
            <FormPublication/>
            {isLoading ? "Chargement..." : <Publications posts={publications}/>}
        </div>
    )
}

export default Home
