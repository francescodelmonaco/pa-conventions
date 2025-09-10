import { useGlobalContext } from "../contexts/GlobalContexts";

export default function DetailsModal() {
    const {
        selectedConvention,
        closeModal
    } = useGlobalContext();

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 min-w-[400px] max-w-[90vw] relative">
                <button
                    className="absolute top-3 right-3 text-lg font-bold text-(--gray) hover:text-gray-800 hover:cursor-pointer"
                    onClick={closeModal}
                    aria-label="Chiudi"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <h2 className="text-xl font-bold mb-2 text-center">{selectedConvention.names ?? '-'}</h2>
                <p className="text-(--gray) text-sm text-center mb-4">{selectedConvention.types ?? '-'} | {selectedConvention.discounts ?? '-'}</p>

                <div className="space-y-2">
                    <p><strong>Sede:</strong> {selectedConvention.locations ?? '-'}</p>
                    <p><strong>Note:</strong> {selectedConvention.notes ?? '-'}</p>
                    <p><strong>Scadenza:</strong> {new Date(selectedConvention.expirations).toLocaleDateString('it-IT') ?? '-'}</p>
                    <p><strong>Mail:</strong> {selectedConvention.mails ?? '-'}</p>
                    <p><strong>Telefono:</strong> {selectedConvention.phones ?? '-'}</p>
                </div>
            </div>
        </div>
    )
}