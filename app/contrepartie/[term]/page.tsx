"use client";
import { formatNumber } from "@/app/utils";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { project } from "@/lib/apiEndpoints";
import axios from "axios";
import { WhatsappIcon } from "next-share";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    params: {
        term: string,
        option: any,
    }
}

function ContrepartiePage({ params: { term, option } }: Props) {

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

    // Fonction pour ajouter ou retirer un article du panier
    const togglePanier = (item: any) => {
        const index = panier.findIndex((article) => article.id === item.id);
        if (index !== -1) {
            // L'article est déjà dans le panier, on le retire
            const nouveauPanier = [...panier];
            nouveauPanier.splice(index, 1);
            setPanier(nouveauPanier);
        } else {
            // L'article n'est pas dans le panier, on l'ajoute
            const nouvelArticle = { ...item, quantite: quantite };
            setPanier([...panier, nouvelArticle]);
        }
    };

    // Fonction pour incrémenter la quantité
    const incrementerQuantite = (index: number) => {
        const nouveauPanier = [...panier];
        nouveauPanier[index].quantite++;
        setPanier(nouveauPanier);
    };

    // Fonction pour décrémenter la quantité
    const decrementerQuantite = (index: number) => {
        const nouveauPanier = [...panier];
        if (nouveauPanier[index].quantite > 1) {
            nouveauPanier[index].quantite--;
        } else {
            // Si la quantité est déjà 1, retirer l'article du panier
            nouveauPanier.splice(index, 1);
        }
        setPanier(nouveauPanier);
    };

    // Calculer le montant total du panier
    const montantTotal = () => {
        return panier.reduce((total, item) => total + (item.montant * item.quantite), 0);
    };

    // Bouton pour procéder au paiement
    const payer = async () => {

        var postData = {
            'amount': montantTotal(),
            'title': "Financement du projet " + projectData.titre,
            'id_projet': projectData?.id,
            'panier': panier,
        }

        setPaymentIsLoad2(true);

        try {
            const response = await axios.post(project.pay,
                postData
            );

            setShowModal(true);

            // const newWindow = window.open(response.data.data, '_blank', 'noopener,noreferrer')
            // if (newWindow) newWindow.opener = null
            setPaymentIsLoad2(false);
        } catch (error) {
            setShowModal(false);
            setPaymentIsLoad2(false);
        }
    };

    // Fonction pour effectuer un don
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
            const response = await axios.post(project.pay,
                postData
            );

            // const newWindow = window.open(response.data.data, '_blank', 'noopener,noreferrer')
            // if (newWindow) newWindow.opener = null

            setShowModal(true);

            setPaymentIsLoad(false);

        } catch (error) {
            setShowModal(false);
            setPaymentIsLoad(false);
        }


    };

    const contactUs = () => {
        var message = `Je souhaite souscrire à ce projet : https://www.consofinance.com/contrepartie/agriculture-autre`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/+237670184640?text=${encodedMessage}`;
        window.open(whatsappUrl);
    }

    useEffect(() => {
        getContrepartieByProjetID(termToUse);
    }, []);

    //Api call to get projets
    return (
        <div className="pt-20">
            {!isLoad ? <>
                <div className="relative flex flex-col justify-center items-center">
                    <div className="p-3 lg:w-5/6">
                        <Link href={`/#categories`}> <h1 className="text-2xl pt-10 font-bold text-white"> <span className="border-b-2 border-b-orange-400 cursor-pointer hover:text-orange-400">Projets</span> / Souscription</h1></Link>
                        <h1 className="mt-4 text-white">{projectData?.titre}</h1>
                    </div>

                    <div className="absolute inset-0 w-full" style={{ backgroundImage: `url(${projectData?.image})`, height: '60vh', zIndex: -1, filter: 'brightness(50%)' }}>
                    </div>

                    <div className="w-full relative min-h-60 m-4 top-0 lg:w-5/6 p-4 lg:top-10  lg:py-10 bg-white rounded-lg shadow-md">
                        {panier.length > 0 && <div className="w-full mb-5 lg:px-4">
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
                                    <button className="flex justify-center h-14 items-center bg-white border border-white w-full font-bold lg:w-1/3 p-4 rounded-lg my-4 hover:text-primarycolor" onClick={() => contactUs()}><WhatsappIcon className="rounded-full p-2 " /> {"CONTACTEZ NOUS"}</button>
                                </div>
                            </div>
                        </div>}
                        <div className="lg:flex w-full">
                            <div className="flex flex-wrap lg:w-2/3">
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
                                            <div className="text-gray-600 line-clamp-3"
                                                dangerouslySetInnerHTML={{ __html: item?.description }}
                                            />
                                            <p className="text-gray-600 mt-2">Date Livraison: {item?.date_livraison}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white">
                                <div className="p-4 shadow-sm rounded border border-gray-200">
                                    <h1 className="font-bold text-lg mb-2"> Faire un don</h1>
                                    <p className="mb-4">
                                        Un don sans contrepartie pour contribuer à la réussite de la collecte !
                                    </p>
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
                                    <button className="flex justify-center items-center bg-white border border-primarycolor w-full rounded-lg my-4 font-bold" onClick={() => contactUs()}><WhatsappIcon className="rounded-full p-2" /> CONTACTEZ NOUS</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-48 h-2"></div>
            </> : <>
                <div className="h-screen flex justify-center items-center bg-slate-50">
                    <p>Chargement...</p>
                </div>
            </>
            }

            {showModal && <Modal
                id="default-modal"
                title="Demande envoyée"
                content={[
                    "Votre demande a été envoyée avec succès. Nos équipes vous contacteront dans les plus brefs délais. Consofinance vous remercie de votre confiance.",
                ]}
                acceptBtn={() => {
                    setShowModal(false);
                    window.location.href ="/";
                }}
                declineBtn={() => {
                    setShowModal(false);
                }}
            />
            }
        </div>
    )
}

export default ContrepartiePage;
