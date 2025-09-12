import { useGlobalContext } from "../contexts/GlobalContexts";
import { useState, useMemo } from "react";
import Loader from "./Loader";

export default function Table() {
    const {
        filteredConventions,
        handleInfoClick,
        isLoading,
        search
    } = useGlobalContext();

    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    const columns = [
        { key: "types", label: "Categoria" },
        { key: "names", label: "Negozio" },
        { key: "locations", label: "Sede" },
        { key: "discounts", label: "Scontistica" },
    ];

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

    // Pagination logic
    const totalRows = sortedConventions.length;
    const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
    const paginatedConventions = useMemo(() => {
        const startIdx = (currentPage - 1) * rowsPerPage;
        return sortedConventions.slice(startIdx, startIdx + rowsPerPage);
    }, [sortedConventions, currentPage, rowsPerPage]);

    useMemo(() => {
        if (currentPage > totalPages) setCurrentPage(1);
    }, [rowsPerPage, totalPages]);

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
            }
            return { key, direction: "asc" };
        });
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    const fromRow = totalRows === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
    const toRow = Math.min(currentPage * rowsPerPage, totalRows);

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wider">
                            {columns.map(col => (
                                <th
                                    key={col.key}
                                    className="py-3 px-4 font-semibold cursor-pointer select-none text-left"
                                    onClick={() => handleSort(col.key)}
                                >
                                    <span className="flex items-center gap-1">
                                        {col.label}
                                        {sortConfig.key === col.key ? (
                                            sortConfig.direction === "asc" ? (
                                                <i className="fa-solid fa-arrow-up-short-wide text-xs ml-1" title="Ordina crescente"></i>
                                            ) : (
                                                <i className="fa-solid fa-arrow-down-wide-short text-xs ml-1" title="Ordina decrescente"></i>
                                            )
                                        ) : (
                                            <i className="fa-solid fa-arrow-up-short-wide text-xs ml-1 opacity-30" title="Ordina"></i>
                                        )}
                                    </span>
                                </th>
                            ))}
                            <th className="py-3 px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="py-10">
                                    <div className="flex justify-center">
                                        <Loader />
                                    </div>
                                </td>
                            </tr>
                        ) : Array.isArray(paginatedConventions) && paginatedConventions.length > 0 ? (
                            paginatedConventions.map((c, idx) => {
                                const { id, types, names, locations, discounts } = c;
                                return (
                                    <tr
                                        key={id}
                                        className={
                                            idx % 2 === 0
                                                ? "bg-white hover:bg-gray-50 transition"
                                                : "bg-gray-50 hover:bg-gray-100 transition"
                                        }
                                    >
                                        <td className="py-3 px-4">
                                            {types ?? "-"}
                                        </td>
                                        <td className="py-3 px-4 font-semibold">
                                            {names ?? "-"}
                                        </td>
                                        <td className="py-3 px-4">
                                            {locations ?? "-"}
                                        </td>
                                        <td className="py-3 px-4">
                                            {discounts ?? "-"}
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full font-semibold cursor-pointer text-xs hover:bg-gray-400 transition"
                                                onClick={() => handleInfoClick(c)}
                                            >Info</button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            // Mostra il messaggio solo se c'è una ricerca attiva e non ci sono risultati
                            <tr>
                                <td colSpan={5} className="py-6 text-center text-gray-400 text-sm">
                                    {search ? <p>Nessuna convenzione trovata</p> : null}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* pagination */}
                <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
                    <span>{fromRow}-{toRow} di {totalRows}</span>
                    <div className="flex items-center gap-2">
                        <span>Righe per pagina:
                            <select
                                className="ml-1 px-1 py-0.5 border rounded text-xs"
                                value={rowsPerPage}
                                onChange={handleRowsPerPageChange}
                            >
                                {[5, 10, 20, 50].map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </span>
                        <button
                            className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-40"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            <i className="fa-solid fa-chevron-left text-xs"></i>
                        </button>
                        <span className="font-semibold">{currentPage}/{totalPages}</span>
                        <button
                            className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-40"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages || totalRows === 0}
                        >
                            <i className="fa-solid fa-chevron-right text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}