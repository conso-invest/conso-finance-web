"use client";
import ProjetCard from "@/components/ProjetCard";
import { Select } from "@/components/ui/select";
import {project } from "@/lib/apiEndpoints";
import axios from "axios";
import { useEffect, useState } from "react";

function Search() {
    const [categoryData, setCategoryData] = useState([]);
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');
    const [projectData, setProjectData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState<any>();

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
        // Logique de recherche à implémenter ici
        console.log('Catégorie :', selectedCategory);
        console.log('Statut :', status);
        console.log('Date :', date);

        var postData = {
            'category_id': selectedCategory?.id,
            'status': status,
            'date': date,
        };

        const response = await axios.post(project.search, postData);
        setProjectData(response.data.data);

        console.log(response);
    };


    return (<>
        <div>
            <div className="banner flex items-center justify-center px-4 py-12 pt-28 lg:py-20 lg:px-32 lg:pt-36">
                <div className="shadow-lg px-8 py-6 lg:rounded-full">
                    <div className="space-y-5 lg:space-y-0 lg:flex justify-between items-center space-x-4">
                        <div className="lg:flex items-center space-x-4">
                            <label>Catégorie :</label>
                            <Select
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
                            <label>Statut :</label>
                            <select
                                className="border h-12 border-gray-300 rounded-md px-2 py-1"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Tous</option>
                                <option value="status1">Statut 1</option>
                                <option value="status2">Statut 2</option>
                                <option value="status3">Statut 3</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-4">
                            <label>Date :</label>
                            <input
                                type="date"
                                className="h-12 border border-gray-300 rounded-md px-2 py-1"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <button
                            className="h-12 bg-primarycolor text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                            onClick={handleSearch}
                        >
                            Rechercher
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="mx-4 my-10 lg:mx-20">
            {projectData.length > 0 && <div className="flex flex-wrap">
                {projectData.map((item: any) => (
                    <ProjetCard key={item.id} item={item}></ProjetCard>
                ))}
            </div>}
        </div>
    </>)
}

export default Search;