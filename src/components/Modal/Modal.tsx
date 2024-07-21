import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            style={{ transitionDuration: '300ms' }}
        >
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-gray-800 opacity-50" onClick={onClose}></div>
                    <div className="bg-white p-4 rounded-lg shadow-lg z-10 max-w-md mx-auto transform transition-transform ease-in-out duration-300 scale-95 max-h-[80svh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">{title}</h2>
                        <div className="mb-4">{children}</div>
                    </div>

                </>
            )}
        </div>
    );
};

export default Modal;
