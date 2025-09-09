export default function Home() {
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
                    placeholder="Cerca un'attività..." />

                <button className="bg-(--blue) text-(--white) border border-(--blue) rounded-2xl px-4 cursor-pointer flex gap-3 py-1.5">
                    <i class="fa-solid fa-magnifying-glass my-auto"></i>Cerca
                </button>
            </div>
        </div>
    )
};