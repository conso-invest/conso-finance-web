import React from 'react';

// Définir explicitement le type de la prop "id"
interface ModalProps {
    id: string;
    title: string;
    content: string[];
    acceptBtn: any;
    declineBtn: any;
}

const Modal: React.FC<ModalProps> = ({ id, title, content, acceptBtn, declineBtn }) => {
    return (
        <>
            <div className="p-5 fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                <div className="relative w-auto max-w-3xl mx-auto my-6">
                    {/*content*/}
                    <div className="bg-primarycolor border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-secondarycolor rounded-t">
                            <h3 className="text-xl lg:text-3xl font-semibold text-secondarycolor">{title}</h3>
                            <button
                                className="ml-auto text-black bg-transparent border-0 text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={declineBtn}
                            >
                                <span className="text-black opacity-75 hover:opacity-100">×</span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="p-4 lg:px-4 lg:py-20 text-center">
                            {content.map((text, index) => (
                                <p key={index} className="text-white text-xl mb-4">{text}</p>
                            ))}
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-secondarycolor rounded-b">
                            <button
                                className="text-red-500 bg-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-red-500 hover:text-white"
                                type="button"
                                onClick={declineBtn}
                            >
                                Fermer
                            </button>
                            <button
                                className="bg-secondarycolor text-white active:bg-secondarycolor font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-opacity-90"
                                type="button"
                                onClick={acceptBtn}
                            >
                                D'accord
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
        </>
    );
};

export default Modal;
