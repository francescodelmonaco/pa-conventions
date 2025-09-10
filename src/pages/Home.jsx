import DetailsModal from "../components/DetailsModal";
import { useGlobalContext } from "../contexts/GlobalContexts";

export default function Home() {
    const {
        filteredConventions,
        search,
        setSearch,
        typeFilter,
        setTypeFilter,
        typeOptions,
        modalOpen,
        selectedConvention,
        handleInfoClick
    } = useGlobalContext();

    return (
        <div className="w-5/6 mx-auto py-5 flex flex-col justify-between gap-5">
            <h1 className="font-bold text-2xl text-center uppercase">Convenzioni</h1>

            <div className="flex justify-between gap-3 items-center">
                <select
                    name="categories"
                    className="bg-(--blue) text-(--white) border border-(--blue) rounded-2xl px-3 cursor-pointer py-1.5"
                    value={typeFilter}
                    onChange={e => setTypeFilter(e.target.value)}
                >
                    <option value="">Categoria</option>
                    {typeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                <input
                    className="border border-(--gray) rounded-2xl w-full px-3 py-1.5"
                    type="search"
                    placeholder="Cerca un'attività..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <button
                    className="bg-(--blue) text-(--white) border border-(--blue) rounded-2xl px-4 cursor-pointer flex gap-3 py-1.5"
                    type="button"
                >
                    <i className="fa-solid fa-magnifying-glass my-auto"></i>Cerca
                </button>
            </div>

            <table className="text-center bg-white shadow rounded-2xl">
                <thead>
                    <tr>
                        <th className="py-2">Tipologia</th>
                        <th className="py-2">Negozio</th>
                        <th className="py-2">Sede</th>
                        <th className="py-2">Scontistica</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(filteredConventions) && filteredConventions.length > 0 ? (
                        filteredConventions.map(c => {
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

            {/* details modal */}
            {modalOpen && selectedConvention && (
                <DetailsModal />
            )}
        </div>
    )
}