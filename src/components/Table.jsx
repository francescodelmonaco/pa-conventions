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
                        {Array.isArray(sortedConventions) && sortedConventions.length > 0 ? (
                            sortedConventions.map((c, idx) => {
                                const { id, types, names, locations, discounts, status, balance, rate, deposit, phone } = c;
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
                                        <td className="py-3 px-4 font-medium text-gray-900">
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
                            <tr>
                                <td colSpan={5} className="py-6 text-center text-gray-400 text-sm"><p>Nessuna convenzione trovata</p></td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* pagination */}
                <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
                    <span>1-10 of 97</span>
                    <div className="flex items-center gap-2">
                        <span>Rows per page: <span className="font-semibold">10</span></span>
                        <button className="px-2 py-1 rounded hover:bg-gray-200"><i className="fa-solid fa-chevron-left text-xs"></i></button>
                        <span className="font-semibold">1/10</span>
                        <button className="px-2 py-1 rounded hover:bg-gray-200"><i className="fa-solid fa-chevron-right text-xs"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
}