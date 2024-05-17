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

function CategoriesPage({ params: { term } }: Props) {

    const [projectData, setProjectData] = useState<any>();

    if (!term) notFound();
    const termToUse = decodeURI(term);

    const getProjetByCategoryID = async (termToUse: any) => {
        const response = await axios.get(project.getCategoryWithProjet,
            { params: { 'category_id': termToUse } }
        );
        console.log(response.data.data);
        setProjectData(response.data.data[0]);
    }


    useEffect(() => {
        getProjetByCategoryID(termToUse);
    }, []);

    //Api call to get projets
    return (
        <div className="pt-20">
            <div className="relative flex flex-col justify-center items-center">
                <div className="lg:w-5/6">
                    <Link href={`/#categories`}> <h1 className="text-2xl pt-10 font-bold"> <span className="border-b-2 border-b-orange-400 cursor-pointer hover:text-orange-400">Projets</span> / {projectData?.description}({projectData?.projects?.length})</h1></Link>
                </div>

                <div className="absolute inset-0 w-full" style={{ backgroundImage: `url('/bg-cover.jpg')`, height: '60vh', zIndex: -1, filter: 'brightness(100%)' }}>
                </div>

                <div className="w-full relative flex-wrap min-h-60 m-4 top-0 lg:w-5/6 p-4 lg:top-10 lg:flex lg:py-10 bg-white rounded-lg shadow-md">

                    {projectData?.projects?.length === 0 &&
                        <div className="w-full flex justify-center items-center">
                            <h1 className="text-center text-xl">Aucun resultat pour la catégorie <span className="text-primarycolor">{projectData?.description}</span></h1>
                        </div>
                    }

                    {
                        projectData?.projects?.length > 0 && projectData?.projects?.map((item: any, index: any) => (<>
                            <ProjetCard key={index} item={item}></ProjetCard>
                        </>))
                    }

                </div>
            </div>

            <div className="pt-48 h-2"></div>

        </div>
    )
}

export default CategoriesPage;