import { useState } from "react";
import DetailsModal from "../components/DetailsModal";
import Table from "../components/Table";
import { useGlobalContext } from "../contexts/GlobalContexts";

export default function Home() {
    const {
        search,
        setSearch,
        typeFilter,
        setTypeFilter,
        typeOptions,
        modalOpen,
        selectedConvention
    } = useGlobalContext();

    return (
        <div className="w-5/6 mx-auto py-5 flex flex-col justify-between gap-5">
            {/* <h1 className="font-bold text-2xl text-center uppercase">Convenzioni</h1> */}

            <div className="flex justify-between gap-3 items-center">
                <input
                    className="border border-(--gray) rounded-2xl w-full px-3 py-1.5 bg-white shadow"
                    type="search"
                    placeholder="Cerca un negozio..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <button
                    className="bg-(--blue) text-(--white) border border-(--blue) rounded-2xl px-4 cursor-pointer flex gap-3 py-1.5 shadow"
                    type="button"
                >
                    <i className="fa-solid fa-magnifying-glass my-auto"></i>Cerca
                </button>
            </div>

            <div className="flex gap-3 items-start">
                {/* categories accordion */}
                {(() => {
                    const [open, setOpen] = useState(false);
                    return (
                        <div className="flex flex-col gap-1 w-1/4">
                            <button
                                type="button"
                                className="flex items-center justify-between font-semibold mb-1 px-2 py-2 border border-(--white) border-b-(--gray) transition cursor-pointer text-(--blue)"
                                onClick={() => setOpen(prev => !prev)}
                                aria-expanded={open}
                                aria-controls="categorie-accordion-panel"
                            >
                                <span>Categorie</span>
                                <span className={`transition-transform ${open ? 'rotate-90' : ''}`}>
                                    <i className="fa-solid fa-caret-right"></i>
                                </span>
                            </button>

                            {open && (
                                <div id="categorie-accordion-panel" className="flex flex-col gap-1 rounded-b px-2 py-2">
                                    {typeOptions.map(type => (
                                        <label key={type} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                className="category-checkbox"
                                                value={type}
                                                checked={typeFilter.includes(type)}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        setTypeFilter([...typeFilter, type]);
                                                    } else {
                                                        setTypeFilter(typeFilter.filter(t => t !== type));
                                                    }
                                                }}
                                            />
                                            <span>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })()}

                <Table />
            </div>


            {/* details modal */}
            {modalOpen && selectedConvention && (
                <DetailsModal />
            )}
        </div>
    )
}