'use client'
import { useRouter } from 'next/navigation';
import Image from "next/image";

const ProjetCard = ({ item }: any) => {
    const router = useRouter();

    const openProjetDetails = () => {
        router.push(`/details/${item['slug']}`);
    }

    return (
        <div onClick={() => openProjetDetails()} className="w-full lg:w-1/5 projet-card shadow-sm flex-shrink-0 m-2 cursor-pointer rounded-sm border border-gray-100">
            <div className="w-full relative h-48 overflow-hidden">
                <Image 
                    layout="fill"
                    objectFit="fill"
                    src={item.image} 
                    alt="banner" 
                    className="rounded-t-sm" 
                />
            </div>
            <div className="p-2">
                <p className="text-xs text-secondarycolor mb-1 uppercase">{item.owner.name}</p>
                <h2 className="font-bold mb-2 overflow-hidden whitespace-nowrap">{item.titre}</h2>
                <div className="flex justify-between mt-2 text-gray-500 text-xs">
                    <p>J-{item.remainingTime}</p>
                    <p>{item.objectif} FCFA</p>
                </div>
                <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: item.progress + "%" }}></div>
                </div>
            </div>
        </div>
    );
}

export default ProjetCard;
