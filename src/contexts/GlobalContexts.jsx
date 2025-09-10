import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../supabaseClient";

// creo provider
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {


    // posts list
    const [conventions, setConventions] = useState([]);
    // search/filter states
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const debounceTimeout = useRef();

    // Debounce search input
    useEffect(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            setDebouncedSearch(search);
        }, 200);
        return () => clearTimeout(debounceTimeout.current);
    }, [search]);

    // Get unique types for select options
    const typeOptions = useMemo(() => {
        if (!Array.isArray(conventions)) return [];
        const allTypes = conventions.map(c => c.types).filter(Boolean);
        return Array.from(new Set(allTypes));
    }, [conventions]);

    // Filter conventions by search and type
    const filteredConventions = useMemo(() => {
        let filtered = conventions;
        if (typeFilter) {
            filtered = filtered.filter(c => c.types === typeFilter);
        }
        if (debouncedSearch) {
            filtered = filtered.filter(c =>
                c.names && c.names.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
        }
        return filtered;
    }, [conventions, debouncedSearch, typeFilter]);

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
        conventions,
        filteredConventions,
        search,
        setSearch,
        typeFilter,
        setTypeFilter,
        typeOptions
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };