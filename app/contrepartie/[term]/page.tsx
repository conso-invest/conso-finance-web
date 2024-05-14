// Add this line at the top of your file
"use client";
import ProjetCard from "@/components/ProjetCard";
import { Button } from "@/components/ui/button";
import { project } from "@/lib/apiEndpoints";
import axios from "axios";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    params: {
        term: string,
    }
}

function ContrepartiePage({ params: { term } }: Props) {

    const [projectData, setProjectData] = useState<any>([]);

    if (!term) notFound();
    const termToUse = decodeURI(term);

    const getContrepartieByProjetID = async (termToUse: any) => {
        const response = await axios.get(project.getProjetContrePartie,
            { params: { 'slug': termToUse } }
        );
        console.log(response.data.data);
        setProjectData(response.data.data);
    }

    const pay = async (item: any) => {

        var postData = {
            'amount': item.montant,
            'title': item.titre,
        }

        console.log(postData);

        const response = await axios.post(project.pay,
            postData
        );

        console.log(response.data.data);


        const newWindow = window.open(response.data.data, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null

      
    }

    useEffect(() => {
        getContrepartieByProjetID(termToUse);
    }, []);

    //Api call to get projets
    return (
        <div className="pt-20">
            <div className="relative flex flex-col justify-center items-center">
                <div className="lg:w-5/6">
                    <Link href={`/#categories`}> <h1 className="text-2xl pt-10 font-bold"> <span className="border-b-2 border-b-orange-400 cursor-pointer hover:text-orange-400">Projets</span> / Souscription</h1></Link>
                </div>

                <div className="absolute inset-0 w-full" style={{ backgroundImage: `url('/bg-cover.jpg')`, height: '60vh', zIndex: -1, filter: 'brightness(100%)' }}>
                </div>

                <div className="w-full relative min-h-60 m-4 top-0 lg:w-5/6 p-4 lg:top-10 lg:flex lg:py-10 bg-white rounded-lg shadow-md">

                    {projectData?.length === 0 &&
                        <div className="w-full flex justify-center items-center">
                            <h1 className="text-center text-xl">Aucun resultat trouvé</h1>
                        </div>
                    }


                    {projectData?.length > 0 && projectData?.map((item: any) =>
                        <div className="w-full lg:w-1/3 mx-4 border shadow-sm mb-10 flex items-start border-b border-gray-200 p-4 rounded-lg" key={item.id}>
                            <div className="w-full">
                                <div className="flex justify-between mb-7">
                                    <div className="text-xl text-gray-600 font-bold">Pour {item?.montant} FCFA</div>
                                    <button className="bg-primarycolor px-4 py-2 rounded-full text-white" onClick={() => pay(item)} >Choisir</button>
                                </div>
                                <img src={item.image} alt={item.titre} className="w-80 object-cover rounded" />
                                <h2 className="text-lg font-semibold my-2">{item?.titre} </h2>
                                <div className="text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: item?.description }}
                                />
                                <p className="text-gray-600 mt-2">Date Livraison: {item?.date_livraison}</p>
                            </div>
                        </div>
                    )}


                </div>
            </div>

            <div className="pt-48 h-2"></div>

        </div>
    )
}

export default ContrepartiePage;