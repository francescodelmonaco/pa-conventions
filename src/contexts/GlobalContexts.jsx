import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../supabaseClient";

// creo provider
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    // posts list
    const [conventions, setConventions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    // Ordinamento tabella
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
            }
            return { key, direction: "asc" };
        });
    };
    const sortedConventions = useMemo(() => {
        if (!Array.isArray(filteredConventions)) return [];
        if (!sortConfig.key) return filteredConventions;
        const sorted = [...filteredConventions].sort((a, b) => {
            const aValue = a[sortConfig.key] ?? "";
            const bValue = b[sortConfig.key] ?? "";
            // Numeric sort if both are numbers
            if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
                return sortConfig.direction === "asc"
                    ? parseFloat(aValue) - parseFloat(bValue)
                    : parseFloat(bValue) - parseFloat(aValue);
            }
            // String sort
            return sortConfig.direction === "asc"
                ? String(aValue).localeCompare(String(bValue))
                : String(bValue).localeCompare(String(aValue));
        });
        return sorted;
    }, [filteredConventions, sortConfig]);

    // chiamate api per tutti i post
    const getConventions = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('conventions')
            .select('*');

        if (error) {
            console.error(error);
            setConventions([]);
            setIsLoading(false);
            return;
        };

        setConventions(data || []);
        setIsLoading(false);
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
        sortedConventions,
        sortConfig,
        handleSort,
        search,
        setSearch,
        typeFilter,
        setTypeFilter,
        typeOptions,
        isLoading,
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