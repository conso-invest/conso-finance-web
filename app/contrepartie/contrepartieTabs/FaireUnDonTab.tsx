import { Input } from "@/components/ui/input";
import { useState } from "react";

type FaireUnDonTabProps = {
    donAmount: any;
    setDonAmount: (amount: any) => void;
    error: string;
    setError: (error: string) => void;
    doDon: () => Promise<void>;
    paymentIsLoad: boolean;
};

const FaireUnDonTab = ({ donAmount, setDonAmount, error, setError, doDon, paymentIsLoad }: FaireUnDonTabProps) => {
    return (
        <div className="bg-white">
            <div className="p-4 shadow-sm rounded border border-gray-200">
                <h1 className="font-bold text-lg mb-2"> Faire un don</h1>
                <p className="mb-4">Un don sans contrepartie pour contribuer à la réussite de la collecte !</p>
                <Input
                    placeholder="Entrez le Montant"
                    type="number"
                    className="h-12"
                    value={donAmount}
                    onChange={(event) => {
                        setDonAmount(event.target.value);
                        setError('');
                    }}
                />
                <span className="text-red-500 text-sm">{error != '' ? error : ""}</span>
                <button className="bg-primarycolor w-full p-4 rounded my-4" onClick={() => paymentIsLoad ? null : doDon()}>{paymentIsLoad ? "Traitement..." : "FAIRE UN DON"} </button>
            </div>
        </div>
    );
};

export default FaireUnDonTab;
