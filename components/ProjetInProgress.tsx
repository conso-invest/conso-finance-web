'use client'
import Link from "next/link";
import ProjetCard from "./ProjetCard";
import { Button } from "./ui/button";
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProjetInProgress() {

    const scrollContainerRef = useRef<HTMLDivElement>(null);

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

    var data = [
        { "image": "https://miro.medium.com/v2/resize:fit:5120/1*42ebJizcUtZBNIZPmmMZ5Q.jpeg", "title": "Projet du lorenr oped opi", "ojectif": "1200", "raised": "300", "jj": "3" },
        { "image": "https://agribusinessdata.com/wp-content/uploads/2022/02/quels-sont-les-differents-types-dagriculture-scaled-1270x675-1.jpg", "title": "Projet du lorenr oped opi", "ojectif": "1200", "raised": "300", "jj": "3" },
        { "image": "https://www.fao.org/uploads/pics/test_11.jpg", "title": "Projet du lorenr oped opi", "ojectif": "1200", "raised": "300", "jj": "3" },
        { "image": "https://media.post.rvohealth.io/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg", "title": "Projet du lorenr oped opi", "ojectif": "1200", "raised": "300", "jj": "3" },
        { "image": "https://image.cnbcfm.com/api/v1/image/107185268-1674841615778-gettyimages-1457910259-a7404995.jpeg?v=1684929601&w=1920&h=1080", "title": "Projet du lorenr oped opi", "ojectif": "1200", "raised": "300", "jj": "3" },
        { "image": "https://image.geo.de/30119042/t/ZF/v3/w960/r1.5/-/afrika-landschaft-c-4904118-jpg--66881-.jpg", "title": "Projet du lorenr oped opi", "ojectif": "1200", "raised": "300", "jj": "3" },
        { "image": "https://blog4.mfrural.com.br/wp-content/uploads/2020/02/clima-x-tempo.jpg", "title": "Projet du lorenr oped opi", "ojectif": "1200", "raised": "300", "jj": "3" },
        { "image": "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/7OYVNICAMJAKTF4II5HXBQLJHQ.jpg", "title": "Projet du lorenr oped opi", "ojectif": "1200", "raised": "300", "jj": "3" },
        { "image": "https://www.vilaencantada.com.br/wp-content/uploads/2022/02/clima-pomerode.jpg", "title": "Projet du lorenr oped opi", "ojectif": "1200", "raised": "300", "jj": "3" },
        { "image": "https://www.fodecc.cm/wp-content/uploads/2021/03/cacao-721x400-1.jpg", "title": "Projet du lorenr oped opi", "ojectif": "1200", "raised": "300", "jj": "3" },
        { "image": "https://www.papillesetpupilles.fr/wp-content/uploads/2016/10/Jus-de-sucre-de-cane-%C2%A9jmexclusives-CC0-Pixabay.jpg", "title": "Projet du lorenr oped opi", "ojectif": "1200", "raised": "300", "jj": "3" },
        { "image": "https://cdn.revolution-energetique.com/uploads/2021/09/Ancienne-mine-duranium-768x432.jpg", "title": "Projet du lorenr oped opi", "ojectif": "1200", "raised": "300", "jj": "3" },
        { "image": "https://www.ruedelapaye.com/wp-content/uploads/2017/09/OIP.webp", "title": "Projet du lorenr oped opi", "ojectif": "1200", "raised": "300", "jj": "3" },
        { "image": "https://i.ytimg.com/vi/Rk5a55ycugI/maxresdefault.jpg", "title": "Projet du lorenr oped opi", "ojectif": "1200", "raised": "300", "jj": "3" },
    ]

    const categorieData = [
        { id: 1, label: "A la une" },
        { id: 2, label: "Popularité" },
        { id: 3, label: "DB & Manga" },
        { id: 4, label: "Jeux" },
        { id: 5, label: "Music" },
        { id: 6, label: "Mode & Design" },
        { id: 7, label: "Santé & Bien-être" },
        { id: 8, label: "Édition & Média" },
        { id: 9, label: "Solidaire & Citoyen" },
        { id: 1, label: "A la une" },
        { id: 2, label: "Popularité" },
        { id: 3, label: "DB & Manga" },
        { id: 4, label: "Jeux" },
        { id: 5, label: "Music" },
        { id: 6, label: "Mode & Design" },
        { id: 7, label: "Santé & Bien-être" },
        { id: 8, label: "Édition & Média" },
        { id: 9, label: "Solidaire & Citoyen" }
    ];

    // Divisez les données en deux ensembles
    const firstRowData = data.slice(0, Math.ceil(data.length / 2));
    const secondRowData = data.slice(Math.ceil(data.length / 2));


    return (
        <div>
            <div className="flex justify-between items-center px-4 py-10 lg:px-20">
                <div className="w-full">
                    <h1 className="text-3xl lg:text-4xl font-extrabold">Les <span className="bg-primarycolor text-white px-4 py-1 rounded">projets</span>  en cours</h1>
                    <div className="mt-5 overflow-auto lg:w-full whitespace-nowrap scroll-smooth no-scrollbar">
                        {categorieData.slice(0, 9).map(item => (
                            <span key={item.id} className="cursor-pointer hover:border-b-2 border-primarycolor mr-4">{item.label}</span>
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
                <div className="m-2 lg:ml-20">
                    <div className="lg:flex">
                        {firstRowData.map((item, index) => (<>
                            <ProjetCard key={index} item={item} ></ProjetCard>
                        </>))}
                    </div>
                    <div className="hidden lg:flex mt-5">
                        {secondRowData.map((item, index) => (<>
                            <ProjetCard key={index} item={item} ></ProjetCard>
                        </>))}
                    </div>
                </div>
            </div>
            <div className="mx-4 lg:mx-20 my-10">
                <h1 className="text-2xl font-extrabold my-5">Parcourir par catégorie</h1>
                <div className="flex flex-wrap">
                    {categorieData.map(item => (
                        <span key={item.id} className="cursor-pointer p-2 border rounded-full m-2 font-bold text-sm hover:text-primarycolor hover:border-primarycolor">{item.label}</span>
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