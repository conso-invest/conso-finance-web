import { Trash2Icon } from 'lucide-react';
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
            <div className="p-4 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="bg-primarycolor border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-secondarycolor rounded-t">
                            <h3 className="text-xl lg:text-3xl font-semibold text-secondarycolor">{title}</h3>
                            <button
                                className="p-1 ml-auto  border-0 text-black opacity- float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={declineBtn}
                            >
                                <span className="text-black">
                                    X
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <p className='text-white text-xl p-4 lg:px-4 lg:py-20 text-center'>{content}</p>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-secondarycolor rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={declineBtn}
                            >
                                Annuler
                            </button>
                            <button
                                className="bg-secondarycolor text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={acceptBtn}
                            >
                                D'accord
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default Modal;
