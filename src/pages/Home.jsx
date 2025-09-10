import { useGlobalContext } from "../contexts/GlobalContexts"

export default function Home() {
    const { conventions } = useGlobalContext();

    return (
        <div className="w-5/6 mx-auto py-5 flex flex-col justify-between gap-5">
            <h1 className="font-bold text-2xl text-center uppercase">Convenzioni</h1>

            <div className="flex justify-between gap-3 items-center">
                <select
                    name="categories"
                    className="bg-(--blue) text-(--white) border border-(--blue) rounded-2xl px-3 cursor-pointer py-1.5"
                >
                    <option value="">Categoria</option>
                    <option value="clothing">Abbigliamento</option>
                </select>

                <input
                    className="border border-(--gray) rounded-2xl w-full px-3 py-1.5"
                    type="search"
                    placeholder="Cerca un'attività..."
                />

                <button className="bg-(--blue) text-(--white) border border-(--blue) rounded-2xl px-4 cursor-pointer flex gap-3 py-1.5">
                    <i className="fa-solid fa-magnifying-glass my-auto"></i>Cerca
                </button>
            </div>

            <table className="text-center bg-white shadow rounded-2xl">
                <tr>
                    <th className="py-2">Tipologia</th>
                    <th className="py-2">Negozio</th>
                    <th className="py-2">Sede</th>
                    <th className="py-2">Scontistica</th>
                </tr>

                {Array.isArray(conventions) && conventions.length > 0 ? (
                    conventions.map(c => {
                        const { id, types, names, locations, discounts } = c;

                        return (
                            <tr key={id}>
                                <td className="py-2">{types ?? '-'}</td>
                                <td className="py-2">{names ?? '-'}</td>
                                <td className="py-2">{locations ?? '-'}</td>
                                <td className="py-2">{discounts ?? '-'}</td>

                                <button className="bg-(--gray) text-(--white) px-2 py-1 rounded-full font-bold cursor-pointer text-sm">Info</button>
                            </tr>
                        )
                    })
                ) : (
                    <p>Nessuna convenzione trovata.</p>
                )}
            </table>
        </div>
    )
};