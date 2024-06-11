"use client";
import ProjetCard from "@/components/ProjetCard";
import { Select } from "@/components/ui/select";
import { project } from "@/lib/apiEndpoints";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Search() {
    const [categoryData, setCategoryData] = useState([]);
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');
    const [projectData, setProjectData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [startSearch, setStartSearch] = useState(false);

    const fetchCategory = async () => {
        try {
            const response = await axios.get(project.getAllCategory);
            setCategoryData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [])

    const handleSearch = async () => {
        setIsLoading(true);
        setStartSearch(true);

        var postData = {
            'category_id': selectedCategory,
            'status': status == 'all' ? '' : status,
            'date': date,
        };

        const response = await axios.post(project.search, postData);

        setIsLoading(false)
        setProjectData(response.data.data);

    };


    return (<>
        <div>
            <div className="banner flex items-center justify-center px-4 py-12 pt-28 lg:py-20 lg:px-32 lg:pt-36">
                <div className="shadow-lg px-8 py-6 lg:rounded-full">
                    <div className="space-y-5 lg:space-y-0 lg:flex justify-between items-center space-x-4">
                        <div className="flex items-center space-x-4">
                            <label>Catégorie:</label>
                            <Select
                                className="h-12"
                                onChange={(event) => setSelectedCategory(event.target.value)}
                            >
                                {categoryData.map((option: any) => (
                                    <option key={option.id} value={option.id}>
                                        {option.titre}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex items-center space-x-4">
                            <label>Statut:</label>
                            <select
                                className="border h-12 border-gray-300 rounded-md px-2 py-1"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="all">Tous</option>
                                <option value="inprogress">En cours de financement</option>
                                <option value="done">Terminée</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-4">
                            <label>Date:</label>
                            <input
                                type="date"
                                className="h-12 border border-gray-300 rounded-md px-2 py-1"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <button
                            className="w-full lg:w-auto h-12 bg-primarycolor text-white px-4 py-2 rounded-md hover:bg-primarycolor transition-colors"
                            onClick={handleSearch}
                        >
                            Rechercher
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="mx-4 my-10 lg:mx-20">

            {isLoading && <div className="w-full">
                <h1 className="text-center">Recherche en cours...</h1>
            </div>}

            {((projectData?.length == 0 || projectData == null) && !isLoading && startSearch) && <div className="w-full">
                <h1 className="text-center">Aucun résultat pour cette recherche</h1>
            </div>}

            {(projectData?.length > 0 && !isLoading) && <div className="flex flex-wrap justify-center items-center">
                {projectData.map((item: any) => (
                    
                        <ProjetCard key={item.id} item={item}></ProjetCard>
                   
                ))}
            </div>}
        </div>
    </>)
}
