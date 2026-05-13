import Button from "../Button"

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {

    if (!isOpen) return null

    return (
        <div className="min-h-80 flex items-center justify-center p-8">
            <div className="bg-[#2d2d2d] rounded-xl p-6 w-80 relative">

                <Button
                    className="absolute top-3 right-3 w-7 h-7 bg-red-600 rounded-md flex items-center justify-center hover:bg-red-700 transition-colors"
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Button>

                <h2 className="text-white text-lg font-medium mb-5">{children}</h2>

                <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                    {children}
                </ol>
            </div>
        </div>
    )
}

export default Modal