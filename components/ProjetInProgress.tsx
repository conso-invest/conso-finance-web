'use client'
import ProjetCard from "./ProjetCard";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { project } from "@/lib/apiEndpoints";
import Link from "next/link";

function ProjetInProgress() {

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [categoryList, setCategoryList] = useState<any>([]);
    const [projetList, setProjetList] = useState<any>([]);
    const [activeItem, setActiveItem] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleScrollLeft = () => {
        if (scrollContainerRef && scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 400; // ajustez la quantité de défilement selon votre besoin
        }
    };

    const handleScrollRight = () => {
        if (scrollContainerRef && scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 400; // ajustez la quantité de défilement selon votre besoin
        }
    };

    useEffect(() => {
        getAllCategory();
        getProjetByID();
    }, [])

    const getAllCategory = async () => {
        const response = await axios.get(project.getAllCategory);
        setCategoryList(response.data.data);
    }

    const getProjetByID = async () => {
        setIsLoading(true);
        const response = await axios.get(project.getProjetByCategory);
        setProjetList(response.data.data);
        setIsLoading(false);
    }

    // Divisez les données en deux ensembles
    const firstRowData = projetList?.slice(0, Math.ceil(projetList.length / 2));
    const secondRowData = projetList?.slice(Math.ceil(projetList.length / 2));

    const getProjetByCategoryID = async (id: any) => {
        setActiveItem(id);
        const response = await axios.get(project.getProjetByCategory,
            { params: { 'category_id': id } }
        );
        setProjetList(response.data.data);
    }

    return (
        <div>
            <div className="flex justify-between items-center px-4 py-10 lg:px-20">
                <div className="w-full">
                    <h1 className="text-xl lg:text-3xl font-extrabold"><span className="bg-primarycolor px-4 py-2 rounded text-white">Les projets en cours</span></h1>
                    <div className="mt-8 overflow-auto lg:w-full whitespace-nowrap scroll-smooth no-scrollbar">
                        {categoryList.slice(0, 9).map((item: any) => (
                            <span key={item.id} className={`${activeItem === item.id ? 'border-b-8 font-bold border-primarycolor' : ''} cursor-pointer hover:border-b-2 border-primarycolor mr-4`} onClick={() => getProjetByCategoryID(item.id)} >{item.titre}</span>
                        ))}
                    </div>
                </div>
                <div className="hidden lg:flex space-x-2">
                    <Button className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-slate-400" onClick={handleScrollLeft}  >
                        <ChevronLeft />
                    </Button>
                    <Button className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-slate-400" onClick={handleScrollRight}  >
                        <ChevronRight />
                    </Button>
                </div>
            </div>
            <div className="lg:overflow-auto whitespace-nowrap scroll-smooth no-scrollbar" ref={scrollContainerRef} >
                <div className="lg:ml-20 w-screen">
                    <div className="lg:flex">
                        {(firstRowData.length == 0 && !isLoading) && <div className="bg-gray-100 w-full flex justify-center items-center lg:mr-20">
                            <h1 className="py-20 text-sm lg:text-2xl text-secondarycolor   ">Aucun projet dans cette rubrique pour le moment</h1>
                        </div>}

                        {firstRowData.length > 0 && firstRowData.map((item: any) => (
                            <ProjetCard key={item.id} item={item} ></ProjetCard>
                        ))}
                    </div>
                    <div className="hidden lg:flex mt-5">
                        {secondRowData.length > 0 && secondRowData.map((item: any) => (
                            <ProjetCard key={item.id} item={item}></ProjetCard>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mx-4 lg:mx-20 my-10" id="categories">
                <h1 className="text-2xl font-extrabold my-5">Parcourir par catégorie</h1>
                <div className="flex flex-wrap space-y-4 justify-start items-center space-x-2">
                    {categoryList.map((item: any) => (
                        <Link key={item.id} href={`categories/${item.id}`}>
                            <span key={item?.id} className="cursor-pointer p-2 border rounded-full font-bold text-sm hover:text-primarycolor hover:border-primarycolor">{item.titre}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mx-4 lg:mx-20">
                <h1 className="text-2xl font-extrabold my-5">Chaînes thématiques</h1>
            </div>
        </div>
    )
}

export default ProjetInProgress;