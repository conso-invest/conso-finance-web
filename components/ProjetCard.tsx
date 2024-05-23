'use client'
import { formatNumber } from '@/app/utils';
import { useRouter } from 'next/navigation';
const ProjetCard = ({ item}: any) => {
    const router = useRouter();

    const openProjetDetails = () => {
        router.push(`/details/${item['slug']}`);
    }

    return (
        <div onClick={() => openProjetDetails()} className={`md:w-1/4 lg:w-1/4 p-2`}>
            <div className='shadow-sm border border-slate-100 hover:cursor-pointer'>
                <img
                    src={item.image}
                    alt="banner"
                    className="rounded-t-sm lg:h-48 md:h-36 w-full object-fill object-center"
                />
                <div className="p-2 w-full">
                    <p className="text-xs text-secondarycolor mb-1 uppercase">{item.owner.name}</p>
                    <h2 className="font-bold mb-2 overflow-hidden whitespace-nowrap">{item.titre}</h2>
                    <div className="flex justify-between mt-2 text-gray-500 text-xs">
                        <p>J-{item.remainingTime}</p>
                        <p>{formatNumber(item.objectif)} FCFA</p>
                    </div>
                    <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                        <div className="bg-primarycolor h-2.5 rounded-full" style={{ width: item.progress + "%" }}></div>
                    </div>
                </div>
            </div>

        </div >
    );
}

export default ProjetCard;
