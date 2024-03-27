import { redirect } from 'next/navigation'

import Image from "next/image";

const ProjetCard = ({ item }: any) => {

    const openSearchPage = () => {
     redirect(`/search/${item['id']}`);
    }

    return (
        <div onClick={() => openSearchPage()} className="shadow-sm lg:w-1/5 flex-shrink-0 m-2 cursor-pointer rounded-sm border border-gray-100">
            <Image height={680} width={1020} src={item.image} alt={item.title} className="w-full h-40 rounded-t-sm" />
            <div className="p-2">
                <h2 className="font-bold">{item.title}</h2>
                <div className="flex justify-between mt-2 text-gray-500 text-xs">
                    <p>{item.raised} FCFA</p>
                    <p>J-{item.jj}</p>
                </div>
            </div>
        </div>
    );
}

export default ProjetCard;
