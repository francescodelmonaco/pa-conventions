import { useGlobalContext } from "../contexts/GlobalContexts";

export default function Table() {
    const {
        filteredConventions,
        handleInfoClick
    } = useGlobalContext();

    return (
        <table className="text-center bg-white shadow rounded-2xl w-3/4">
            <thead>
                <tr>
                    <th className="py-2">Categoria</th>
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
    )
}