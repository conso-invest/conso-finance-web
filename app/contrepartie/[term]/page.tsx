"use client";
import { formatNumber } from "@/app/utils";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { project } from "@/lib/apiEndpoints";
import axios from "axios";
import { DnaIcon } from "lucide-react";
import { WhatsappIcon } from "next-share";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import InvestirTab from "../contrepartieTabs/InvestirTab";
import DevenirActionnaireTab from "../contrepartieTabs/DevenirActionnaireTab";
import FaireUnDonTab from "../contrepartieTabs/FaireUnDonTab";
import TravaillerAvecNousTab from "../contrepartieTabs/TravaillerAvecNousTab";
import NousContacterTab from "../contrepartieTabs/NousContacterTab";

type Props = {
    params: {
        term: string,
        option: any,
    }
}

function ContrepartiePage({ params: { term, option } }: Props) {
    const [activeTabs, setActiveTabs] = useState(1);

    var tabsData = [
        { id: 1, name: "Devenir Investisseur", icon: <DnaIcon /> },
        { id: 2, name: "Devenir Actionaire", icon: <DnaIcon /> },
        { id: 3, name: "Faire Un Don", icon: <DnaIcon /> },
        { id: 4, name: "Travailler Avec Nous", icon: <DnaIcon /> },
        { id: 5, name: "Nous contacter", icon: <DnaIcon /> },
    ]

    const [projectData, setProjectData] = useState<any>([]);
    const [panier, setPanier] = useState<any[]>([]);
    const [quantite, setQuantite] = useState<number>(1);
    const [donAmount, setDonAmount] = useState<any>(null);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [paymentIsLoad, setPaymentIsLoad] = useState<boolean>(false);
    const [paymentIsLoad2, setPaymentIsLoad2] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [showModal, setShowModal] = useState(false);

    if (!term) notFound();
    const termToUse = decodeURI(term);

    const getContrepartieByProjetID = async (termToUse: any) => {
        const response = await axios.get(project.getProjetContrePartie,
            { params: { 'slug': termToUse } }
        );
        setProjectData(response.data.data);
        setIsLoad(false);
    }

    const togglePanier = (item: any) => {
        const index = panier.findIndex((article) => article.id === item.id);
        if (index !== -1) {
            const nouveauPanier = [...panier];
            nouveauPanier.splice(index, 1);
            setPanier(nouveauPanier);
        } else {
            const nouvelArticle = { ...item, quantite: quantite };
            setPanier([...panier, nouvelArticle]);
        }
    };

    const incrementerQuantite = (index: number) => {
        const nouveauPanier = [...panier];
        nouveauPanier[index].quantite++;
        setPanier(nouveauPanier);
    };

    const decrementerQuantite = (index: number) => {
        const nouveauPanier = [...panier];
        if (nouveauPanier[index].quantite > 1) {
            nouveauPanier[index].quantite--;
        } else {
            nouveauPanier.splice(index, 1);
        }
        setPanier(nouveauPanier);
    };

    const montantTotal = () => {
        return panier.reduce((total, item) => total + (item.montant * item.quantite), 0);
    };

    const payer = async () => {
        var postData = {
            'amount': montantTotal(),
            'title': "Financement du projet " + projectData.titre,
            'id_projet': projectData?.id,
            'panier': panier,
        }

        setPaymentIsLoad2(true);

        try {
            const response = await axios.post(project.pay, postData);
            setShowModal(true);
            setPaymentIsLoad2(false);
        } catch (error) {
            setShowModal(false);
            setPaymentIsLoad2(false);
        }
    };

    const doDon = async () => {
        if (donAmount == null || donAmount == "") {
            setError('Veuillez entrer le montant');
            return;
        }

        if (donAmount < 1000) {
            setError('Le montant minimum est de 1.000FCFA');
            return;
        }

        setError('');
        setPaymentIsLoad(true);

        var postData = {
            'amount': donAmount,
            'title': "Don pour le projet " + projectData?.titre,
            'id_projet': projectData?.id,
        }

        try {
            const response = await axios.post(project.pay, postData);
            setShowModal(true);
            setPaymentIsLoad(false);
        } catch (error) {
            setShowModal(false);
            setPaymentIsLoad(false);
        }
    };

    const contactUs = () => {
        var message = `Je souhaite investir sur ce projet : https://www.consofinance.com/contrepartie/agriculture-autre`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/+237670184640?text=${encodedMessage}`;
        window.open(whatsappUrl);
    }

    useEffect(() => {
        getContrepartieByProjetID(termToUse);
    }, []);

    return (
        <div className="pt-20">
            {!isLoad ? (
                <>
                    <div className="relative flex flex-col justify-center items-center">
                        <div className="p-3 lg:w-5/6">
                            <Link href={`/#categories`}>
                                <h1 className="text-2xl pt-10 font-bold text-white">
                                    <span className="border-b-2 border-b-orange-400 cursor-pointer hover:text-orange-400">Projets</span> / Souscription
                                </h1>
                            </Link>
                            <h1 className="mt-4 text-white">{projectData?.titre}</h1>
                        </div>

                        <div className="absolute inset-0 w-full" style={{ backgroundImage: `url(${projectData?.image})`, height: '60vh', zIndex: -1, filter: 'brightness(50%)' }}>
                        </div>

                        <div className="w-full relative min-h-60 m-4 top-0 lg:w-5/6 p-4 lg:top-10 lg:py-10 bg-white rounded-lg shadow-md">
                            <div className="md:flex">
                                <ul className="grid grid-cols-2 lg:flex lg:flex-col gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                                    {tabsData.map((tabs: any) => (
                                        <li key={tabs.id} className="cursor-pointer" onClick={() => setActiveTabs(tabs.id)}>
                                            <a className={`${activeTabs === tabs?.id ? "bg-primarycolor" : "bg-gray-800"} min-h-20 inline-flex items-center px-4 py-3 text-white rounded-lg active w-full dark:bg-blue-600`} aria-current="page">
                                                <svg className="w-4 h-4 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    {tabs.icon}
                                                </svg>
                                                {tabs.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full min-h-screen">
                                    {activeTabs === 1 && (
                                        <InvestirTab
                                            projectData={projectData}
                                            panier={panier}
                                            quantite={quantite}
                                            setPanier={setPanier}
                                            setQuantite={setQuantite}
                                            montantTotal={montantTotal}
                                            payer={payer}
                                            paymentIsLoad2={paymentIsLoad2}
                                            togglePanier={togglePanier}
                                            incrementerQuantite={incrementerQuantite}
                                            decrementerQuantite={decrementerQuantite}
                                        />
                                    )}
                                    {activeTabs === 2 && <DevenirActionnaireTab
                                        projectData={projectData}
                                        panier={panier}
                                        quantite={quantite}
                                        setPanier={setPanier}
                                        setQuantite={setQuantite}
                                        montantTotal={montantTotal}
                                        payer={payer}
                                        paymentIsLoad2={paymentIsLoad2}
                                        togglePanier={togglePanier}
                                        incrementerQuantite={incrementerQuantite}
                                        decrementerQuantite={decrementerQuantite}
                                    />}
                                    {activeTabs === 3 && (
                                        <FaireUnDonTab
                                            donAmount={donAmount}
                                            setDonAmount={setDonAmount}
                                            error={error}
                                            setError={setError}
                                            doDon={doDon}
                                            paymentIsLoad={paymentIsLoad}
                                        />
                                    )}
                                    {activeTabs === 4 && <TravaillerAvecNousTab projectId={projectData.id} />}
                                    {activeTabs === 5 && <NousContacterTab contactUs={contactUs} />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-48 h-2"></div>
                </>
            ) : (
                <div className="h-screen flex justify-center items-center bg-slate-50">
                    <p>Chargement...</p>
                </div>
            )}

            {showModal && (
                <Modal
                    id="default-modal"
                    title="Demande envoyée"
                    content={[
                        "Votre demande a été envoyée avec succès. Nos équipes vous contacteront dans les plus brefs délais. Consofinance vous remercie de votre confiance.",
                    ]}
                    acceptBtn={() => {
                        setShowModal(false);
                        window.location.href = "/";
                    }}
                    declineBtn={() => {
                        setShowModal(false);
                    }}
                />
            )}
        </div>
    );
}

export default ContrepartiePage;
