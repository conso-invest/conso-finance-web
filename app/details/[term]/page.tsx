// Add this line at the top of your file
"use client";
import { Button } from "@/components/ui/button";
import { project } from "@/lib/apiEndpoints";
import axios from "axios";
import { CalculatorIcon, CalendarRange, CalendarRangeIcon, TimerIcon, UsersRound } from "lucide-react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DetailProject from "../componemts/DetailProject";
import ContrepartieProject from "../componemts/ContrepartieProject";
import PublicationProject from "../componemts/PublicationProject";
import CommentProject from "../componemts/CommentProject";
import ContributionProject from "../componemts/ContributionProject";

import {
    FacebookShareButton,
    FacebookIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterIcon,
    TwitterShareButton,
    InstapaperShareButton,
    InstagramIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'next-share'

type Props = {
    params: {
        term: string,
    }
}

function SearchPage({ params: { term } }: Props) {

    const router = useRouter();

    const [detail, setDetail] = useState<any>({});
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [selected, setSelected] = useState<number>(1);

    if (!term) notFound();
    const termToUse = decodeURI(term);

    const handleClick = (index: any) => {
        setSelected(index);
    };

    const fetchOptions = async () => {
        try {
            const response = await axios.get(project.detail(termToUse));
            setDetail((response.data.data));
            setIsLoad(false);
        } catch (error) {
            setIsLoad(false);
            console.error(error);
        }
    };

    const getAllContrepartie = async () => {
        router.push(`/contrepartie/${termToUse}`);
    }

    useEffect(() => {
        fetchOptions();
    }, []);

    return (
        <div className="pt-20">
            {
                !isLoad ? <>
                    <div className="relative flex justify-center items-center">
                        <div className="absolute inset-0 w-full" style={{ backgroundImage: `url(${detail?.image})`, height: '60vh', zIndex: -1, filter: 'brightness(60%)' }}>
                        </div>
                        <div className="relative m-4 top-10 lg:w-5/6 p-4 lg:top-20 lg:flex lg:space-x-10 bg-white rounded-lg shadow-md">
                            <div className="pb-5 lg:pb-20">
                                <img width={1020} height={680} alt="projet" className="h-full rounded-lg object-fill" src={detail?.image}></img>
                                <div className="flex flex-row items-center mt-4">
                                    <span className="font-bold mr-2"> Partarger sur :</span>
                                    <div className="space-x-2">
                                        <FacebookShareButton
                                            url={`https://www.consofinance.com/details/${termToUse}`}
                                            quote={`J'ai trouvé ce projet interessant sur consofinance`}
                                            hashtag={'#consofinance'}
                                        >
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                        <TwitterShareButton
                                            url={`https://www.consofinance.com/details/${termToUse}`}
                                            title={`J'ai trouvé ce projet interessant sur consofinance`}
                                        >
                                            <TwitterIcon size={32} round />
                                        </TwitterShareButton>
                                        <InstapaperShareButton
                                            url={`https://www.consofinance.com/details/${termToUse}`}
                                            title={`J'ai trouvé ce projet interessant sur consofinance`}
                                        >
                                            <InstagramIcon size={32} round />
                                        </InstapaperShareButton>
                                        <WhatsappShareButton
                                            url={`https://www.consofinance.com/details/${termToUse}`}
                                            title={`J'ai trouvé ce projet interessant sur consofinance`}
                                        >
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-3/4">
                                <h1 className="mt-2 text-xl lg:text-5xl font-bold mb-5">{detail?.titre}</h1>
                                <p>{detail?.sous_titre}</p>

                                <div className="progress mt-10 rounded-lg p-5">
                                    <div className="flex justify-between">
                                        <div className="mb-1 text-base font-medium text-primarycolor dark:text-blue-500">Progression</div>
                                        <div className="text-primarycolor">{detail?.progress}%</div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                                        <div className="bg-primarycolor h-2.5 rounded-full" style={{ width: detail?.progress + "%" }}></div>
                                    </div>
                                    <div className="text-xl font-bold mt-10 flex justify-between">
                                        <div className="flex justify-start items-end">
                                            <div className="mr-2">
                                                <UsersRound size={35} />
                                            </div>
                                            <div className="text-sm text-md" >
                                                {detail?.contributors} <span className="text-sm font-normal">contributions</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-start items-end">
                                            <div className="mr-2">
                                                <CalendarRangeIcon size={35} />
                                            </div>
                                            <div className="text-sm text-md">
                                                {detail?.remainingTime} <span className="text-sm font-normal">Jours restant</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <Button className="w-full h-20 text-2xl mt-8 bg-primarycolor flex flex-col" onClick={() => getAllContrepartie()}>
                                        Contribuer au projet
                                        {/* <span className="text-sm mt-2">À partir de 50.000FCFA</span> */}
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="bg-white mt-14 lg:mt-20">
                        <div className="overflow-auto flex lg:px-20 lg:pt-20 lg:pb-3 space-x-5 font-bold border-b-2">
                            <div className={`pb-2 ${selected == 1 ? 'border-b-4 border-black' : ''} cursor-pointer`} onClick={() => handleClick(1)}>Projet</div>
                            <div className={`pb-2 ${selected == 2 ? 'border-b-4 border-black' : ''} cursor-pointer`} onClick={() => handleClick(2)}>Contreparties ({detail?.contrepartie?.length})</div>
                            <div className={`pb-2 ${selected == 3 ? 'border-b-4 border-black' : ''} cursor-pointer`} onClick={() => handleClick(3)}>Publications ({detail?.publication?.length})</div>
                            <div className={`pb-2 ${selected == 4 ? 'border-b-4 border-black' : ''} cursor-pointer`} onClick={() => handleClick(4)} >Contribution ({detail?.souscription?.length})</div>
                            <div className={`pb-2 ${selected == 5 ? 'border-b-4 border-black' : ''} cursor-pointer`} onClick={() => handleClick(5)}>Commentaires ({detail?.commentaire?.length})</div>
                        </div>

                        <div className="overflow-auto p-4 lg:px-20 lg:py-5">
                            {selected == 1 ? <DetailProject item={detail} /> : ''}
                            {selected == 2 ? <ContrepartieProject item={detail} /> : ''}
                            {selected == 3 ? <PublicationProject item={detail.publication} /> : ''}
                            {selected == 4 ? <ContributionProject item={detail.souscription} /> : ''}
                            {selected == 5 ? <CommentProject item={detail.commentaire} id_projet_comment={detail.id} /> : ''}
                        </div>
                    </div>
                </> :
                    <>
                        <div className="h-screen bg-slate-50 flex justify-center items-center">Chargement...</div>
                    </>
            }
        </div>
    );
}

export default SearchPage;