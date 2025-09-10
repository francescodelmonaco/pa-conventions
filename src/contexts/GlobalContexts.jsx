import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

// creo provider
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    // posts list
    const [conventions, setConventions] = useState([]);

    // chiamate api per tutti i post
    const getConventions = async () => {
        const { data, error } = await supabase
            .from('conventions')
            .select('*');

        if (error) {
            console.error(error);
            setConventions([]);
            return;
        };

        setConventions(data || []);
        console.log('Fetched conventions:', data);
    };

    useEffect(() => { getConventions() }, []);

    // destructuring
    const value = {
        conventions
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };