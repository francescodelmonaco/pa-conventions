import { useGlobalContext } from "../contexts/GlobalContexts";

export default function DetailsModal() {
    const {
        selectedConvention,
        closeModal
    } = useGlobalContext();

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-3/5 relative">
                <button
                    className="absolute top-3 right-3 text-lg font-bold text-(--gray) hover:text-gray-800 hover:cursor-pointer"
                    onClick={closeModal}
                    aria-label="Chiudi"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <h2 className="text-xl font-bold mb-2 text-center uppercase">{selectedConvention.names ?? '-'}</h2>
                <p className="text-(--gray) text-sm text-center mb-4">{selectedConvention.types ?? '-'} | {selectedConvention.discounts ?? '-'}</p>

                <div className="space-y-2">
                    <p><strong>Sede:</strong> {selectedConvention.locations ?? '-'}</p>
                    {selectedConvention.locations && (
                        <div className="my-2 rounded-lg overflow-hidden border border-gray-200">
                            <iframe
                                title="Mappa sede"
                                width="100%"
                                height="250"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://www.google.com/maps?q=${encodeURIComponent(selectedConvention.locations)}&output=embed`}
                            ></iframe>
                        </div>
                    )}
                    <div className="flex gap-2 align-middle items-center">
                        <p><strong>Telefono:</strong> {selectedConvention.phones ?? '-'}</p>
                        {/* <button className="bg-(--blue) text-(--white) px-3 py-1 rounded-full cursor-pointer text-sm">
                            <i class="fa-solid fa-phone"></i> Chiama
                        </button> */}
                    </div>
                    <div className="flex gap-2 align-middle items-center">
                        <p><strong>Mail:</strong> {selectedConvention.mails ?? '-'}</p>
                        {/* <button className="bg-(--blue) text-(--white) px-3 py-1 rounded-full cursor-pointer text-sm">
                            <i class="fa-solid fa-envelope"></i> Scrivi
                        </button> */}
                    </div>
                    <p><strong>Validità:</strong> fino al {new Date(selectedConvention.expirations).toLocaleDateString('it-IT') ?? '-'}</p>
                    <p><strong>Note:</strong> {selectedConvention.notes ?? '-'}</p>
                </div>
            </div>
        </div>
    )
}