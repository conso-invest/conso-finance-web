import { Button } from "@/components/ui/button";
import { CalculatorIcon, CalendarRange, CalendarRangeIcon, TimerIcon, UsersRound } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
    params: {
        term: string,
    }
}

function SearchPage({ params: { term } }: Props) {
    console.log(term);
    if (!term) notFound();
    const termToUse = decodeURI(term);
    console.log(termToUse);

    //Api call to get projets
    return <div className="pt-20">
        <div className="p-5 lg:flex lg:pt-20 lg:px-20 lg:space-x-10">
            <div>
                <Image width={1020} height={680} alt="projet" className="h-full rounded-lg object-fill" src="https://ddnvb5fufqb8o.cloudfront.net/display/e04bd016987c16e4fb728877584381246ee8f1fb/thumbnail/1280x720/presales/5/8/6/1/8/1/181685/campagne-ulule-kisskiss.Gw8AD6ALxY.gif?q=60&upscale=0"></Image>
            </div>
            <div className="lg:w-3/4">
                <h1 className="mt-2 text-2xl lg:text-5xl font-bold mb-5">Conserver vos aliments : 0 déchet, 100% plaisir 💚</h1>
                <p>Sacasalades by Arminé, les sacs alimentaires 0 déchet pour conserver vos aliments de manière responsable, fabriqué en France avec ❤️</p>

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
                            <div >
                                30 <span className="text-sm font-normal">contributions</span>
                            </div>
                        </div>
                        <div className="flex justify-start items-end">
                            <div className="mr-2">
                                <CalendarRangeIcon size={35} />
                            </div>
                            <div>
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
        <div className="overflow-auto flex lg:p-20 space-x-5 font-bold">
            <span>Projet</span>
            <span>Contreparties</span>
            <span>Publications 1</span>
            <span>Contribution 1</span>
            <span>Commentaires 10</span>
        </div>
    </div>;
}

export default SearchPage;