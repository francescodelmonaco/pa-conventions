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
    const [typeFilter, setTypeFilter] = useState([]);
    const debounceTimeout = useRef();

    // debounce search input
    useEffect(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            setDebouncedSearch(search);
        }, 200);
        return () => clearTimeout(debounceTimeout.current);
    }, [search]);

    // get unique types for select options
    const typeOptions = useMemo(() => {
        if (!Array.isArray(conventions)) return [];
        const allTypes = conventions.map(c => c.types).filter(Boolean);
        return Array.from(new Set(allTypes));
    }, [conventions]);

    // filter conventions by search and type
    const filteredConventions = useMemo(() => {
        let filtered = conventions;
        if (Array.isArray(typeFilter) && typeFilter.length > 0) {
            filtered = filtered.filter(c => typeFilter.includes(c.types));
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

    // Stato e logica per la modale dettagli convention
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedConvention, setSelectedConvention] = useState(null);

    const handleInfoClick = (convention) => {
        setSelectedConvention(convention);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedConvention(null);
    };

    // destructuring
    const value = {
        conventions,
        filteredConventions,
        search,
        setSearch,
        typeFilter,
        setTypeFilter,
        typeOptions,
        // modale
        modalOpen,
        selectedConvention,
        handleInfoClick,
        closeModal
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };