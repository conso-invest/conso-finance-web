// Add this line at the top of your file
"use client";
import { Button } from "@/components/ui/button";
import { project } from "@/lib/apiEndpoints";
import axios from "axios";
import { CalculatorIcon, CalendarRange, CalendarRangeIcon, TimerIcon, UsersRound } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import DetailProject from "../componemts/DetailProject";
import ContrepartieProject from "../componemts/ContrepartieProject";
import PublicationProject from "../componemts/PublicationProject";
import CommentProject from "../componemts/CommentProject";
import ContributionProject from "../componemts/ContributionProject";
type Props = {
    params: {
        term: string,
    }
}

function SearchPage({ params: { term } }: Props) {

    const [detail, setDetail] = useState<any>({});
    const [selected, setSelected] = useState<number>(1);

    if (!term) notFound();
    const termToUse = decodeURI(term);

    const handleClick = (index: any) => {
        setSelected(index);
    };


    const fetchOptions = async () => {
        try {
            const response = await axios.get(project.detail(termToUse));
            console.log(response.data.data);

            setDetail((response.data.data));
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {

        fetchOptions();
    }, []);

    //Api call to get projets
    return <div className="pt-20">
        <div className="p-5 lg:flex lg:pt-20 lg:px-20 lg:space-x-10">
            <div>
                <Image width={1020} height={680} alt="projet" className="h-full rounded-lg object-fill" src={detail?.image}></Image>
            </div>
            <div className="lg:w-3/4">
                <h1 className="mt-2 text-xl lg:text-5xl font-bold mb-5">{detail?.titre}</h1>
                <p>{detail?.sous_titre}</p>

                <div className="progress mt-10 shadow-md rounded-lg p-5">
                    <div className="flex justify-between">
                        <div className="mb-1 text-base font-medium text-green-500 dark:text-blue-500">Progression</div>
                        <div className="text-green-500">45%</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <div className="text-xl font-bold mt-10 flex justify-between">
                        <div className="flex justify-start items-end">
                            <div className="mr-2">
                                <UsersRound size={35} />
                            </div>
                            <div className="text-sm text-md" >
                                30 <span className="text-sm font-normal">contributions</span>
                            </div>
                        </div>
                        <div className="flex justify-start items-end">
                            <div className="mr-2">
                                <CalendarRangeIcon size={35} />
                            </div>
                            <div className="text-sm text-md">
                                10 <span className="text-sm font-normal">Jours restant</span>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex justify-center">
                    <Button className="w-full h-20 text-2xl mt-8 bg-primarycolor flex flex-col">
                        Contribuer au projet <span className="text-sm mt-2">À patir de 50.000FCFA</span>
                    </Button>
                </div>

            </div>
        </div>
        <div className="overflow-auto flex lg:px-20 lg:pt-20 lg:pb-3 space-x-5 font-bold border-b-2">
            <div className={`pb-2 ${selected == 1 ? 'border-b-4 border-black' : ''} cursor-pointer`} onClick={() => handleClick(1)}>Projet</div>
            <div className={`pb-2 ${selected == 2 ? 'border-b-4 border-black' : ''} cursor-pointer`} onClick={() => handleClick(2)}>Contreparties ({detail?.contrepartie?.length})</div>
            <div className={`pb-2 ${selected == 3 ? 'border-b-4 border-black' : ''} cursor-pointer`} onClick={() => handleClick(3)}>Publications ({detail?.publication?.length})</div>
            <div className={`pb-2 ${selected == 4 ? 'border-b-4 border-black' : ''} cursor-pointer`} onClick={() => handleClick(4)} >Contribution ({detail?.souscription?.length})</div>
            <div className={`pb-2 ${selected == 5 ? 'border-b-4 border-black' : ''} cursor-pointer`} onClick={() => handleClick(5)}>Commentaires ({detail?.commentaire?.length})</div>
        </div>

        <div className="overflow-auto  lg:px-20 lg:py-5">

            {selected == 1 ? <DetailProject item={detail.description} /> : ''}
            {selected == 2 ? <ContrepartieProject item={detail.contrepartie} /> : ''}
            {selected == 3 ? <PublicationProject item={detail.publication} /> : ''}
            {selected == 4 ? <ContributionProject item={detail.souscription} /> : ''}
            {selected == 5 ? <CommentProject item={detail.commentaire} /> : ''}


        </div>
    </div>;
}

export default SearchPage;