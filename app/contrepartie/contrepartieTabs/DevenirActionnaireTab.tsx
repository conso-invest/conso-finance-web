
import { formatNumber } from "@/app/utils";
import { useState } from "react";

type InvestirTabProps = {
    projectData: any;
    panier: any[];
    quantite: number;
    setPanier: (panier: any[]) => void;
    setQuantite: (quantite: number) => void;
    montantTotal: () => number;
    payer: () => Promise<void>;
    paymentIsLoad2: boolean;
    togglePanier: (item: any) => void;
    incrementerQuantite: (index: number) => void;
    decrementerQuantite: (index: number) => void;
};

const DevenirActionnaireTab = ({ projectData, panier, quantite, setPanier, setQuantite, montantTotal, payer, paymentIsLoad2, togglePanier, incrementerQuantite, decrementerQuantite }: InvestirTabProps) => {
    return (
        <div>
            {panier.length > 0 && (
                <div className="w-full mb-5 lg:px-4">
                    <div className={`p-4 shadow-md border w-full rounded-lg`}>
                        <h1 className="font-bold text-lg mb-6">Vos apports</h1>
                        <ul>
                            {panier.map((item, index) => (
                                <li key={index} className="mb-2 border-b border-slate-200 w-full">
                                    <div className="lg:flex justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            <div>
                                                <img src={item.image} className="w-28 h-28 object-cover rounded-md" alt="" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-secondarycolor">{item.titre}</div>
                                                <div className="text-secondarycolor">Montant: {item.montant * item.quantite} FCFA</div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end lg:justify-center items-center space-x-3 my-4">
                                            <button onClick={() => decrementerQuantite(index)} className="text-2xl bg-primarycolor w-10 h-10 rounded-full">-</button>
                                            <span className="font-bold text-secondarycolor">{item.quantite}</span>
                                            <button onClick={() => incrementerQuantite(index)} className="text-2xl  bg-primarycolor w-10 h-10 rounded-full">+</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="font-bold text-xl my-5 text-secondarycolor">Total: {formatNumber(montantTotal())} FCFA</div>
                        <div className="lg:flex justify-between">
                            <button className="w-full bg-primarycolor h-14 lg:w-1/3 rounded my-4" onClick={() => paymentIsLoad2 ? null : payer()}> {paymentIsLoad2 ? "Traitement" : "INVESTIR"}</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="lg:flex w-full">
                <div className="flex flex-col lg:flex-row lg:w-full">
                    {projectData?.contrepartie?.length > 0 && projectData?.contrepartie?.map((item: any) =>
                        <div className="mx-0 lg:w-full flex-wrap lg:mx-4 border shadow-sm mb-10 items-start border-b border-gray-200 p-4 rounded-lg cursor-pointer" key={item.id}>
                            <div className="w-full">
                                <div className="flex justify-between items-center mb-7 rounded-full">
                                    <div className="text-lg text-gray-600 font-bold">Pour {formatNumber(item?.montant)} FCFA</div>
                                    <button className="bg-primarycolor px-4 py-2 rounded-full text-white" onClick={() => togglePanier(item)} >
                                        {panier.some((article) => article.id === item.id) ? '- Retirer' : 'Choisir'}
                                    </button>
                                </div>
                                <img src={item.image} alt={item.titre} className="w-full object-cover rounded-lg" />
                                <h2 className="text-lg font-semibold my-2">{item?.titre} </h2>
                                <div className="text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: item?.description }} />
                                <p className="text-gray-600 mt-2">Date Livraison: {item?.date_livraison}</p>
                            </div>
                        </div>
                    )}

                    {projectData?.contrepartie?.length == 0 && <div className="flex items-center justify-center min-h-20 w-full">
                        <p className="text-center">Aucune action disponible pour le moment</p>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default DevenirActionnaireTab;
