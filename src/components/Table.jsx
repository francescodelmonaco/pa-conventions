import { useGlobalContext } from "../contexts/GlobalContexts";

import { useState, useMemo } from "react";
export default function Table() {
    const {
        filteredConventions,
        handleInfoClick
    } = useGlobalContext();

    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
            }
            return { key, direction: "asc" };
        });
    };

    return (
        <table className="text-center bg-white shadow rounded-2xl w-3/4">
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={col.key} className="py-2 cursor-pointer select-none" onClick={() => handleSort(col.key)}>
                            <span className="flex items-center gap-1 justify-center">
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
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(sortedConventions) && sortedConventions.length > 0 ? (
                    sortedConventions.map(c => {
                        const { id, types, names, locations, discounts } = c;
                        return (
                            <tr key={id}>
                                <td className="py-2">{types ?? '-'}</td>
                                <td className="py-2">{names ?? '-'}</td>
                                <td className="py-2">{locations ?? '-'}</td>
                                <td className="py-2">{discounts ?? '-'}</td>
                                <td>
                                    <button
                                        className="bg-(--gray) text-(--white) px-2 py-1 rounded-full font-bold cursor-pointer text-sm"
                                        onClick={() => handleInfoClick(c)}
                                    >Info</button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={5} className="py-2"><p>Nessuna convenzione trovata</p></td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}