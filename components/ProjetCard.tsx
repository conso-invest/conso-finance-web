'use client'
import { useRouter } from 'next/navigation';

import Image from "next/image";

const ProjetCard = ({ item }: any) => {

    const router = useRouter();

    const openProjetDetails = () => {
        router.push(`/search/${item['slug']}`);
    }

    return (
        <div onClick={() => openProjetDetails()} className="shadow-sm lg:w-1/5 flex-shrink-0 m-2 cursor-pointer rounded-sm border border-gray-100">
            <Image height={680} width={1020} src={item.image} alt="banner" className="w-full h-40 rounded-t-sm" />
            <div className="p-2">
                <h2 className="font-bold mb-2">{item.titre}</h2>
                <div className="flex justify-between mt-2 text-gray-500 text-xs">
                    <p className='font-bold'>J-{item.id}</p>
                    <p className='font-bold'>{item.objectif} FCFA</p>
                </div>
                <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "1%" }}></div>
                </div>
            </div>
        </div>
    );
}

export default ProjetCard;
