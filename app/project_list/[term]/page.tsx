// Add this line at the top of your file
"use client";
import { Button } from "@/components/ui/button";
import { project } from "@/lib/apiEndpoints";
import axios from "axios";
import { CalculatorIcon, CalendarRange, CalendarRangeIcon, TimerIcon, UsersRound } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    params: {
        term: string,
    }
}

function SearchPage({ params: { term } }: Props) {

    const [detail, setDetail] = useState<any>({});
    const [selected, setSelected] = useState<number>(1);

    if (!term) notFound();
    const termToUse = decodeURI(term);

    const handleClick = (index: any) => {
        setSelected(index);
    };


    const fetchOptions = async () => {
        try {
            const response = await axios.get(project.detail(termToUse));
            console.log(response.data.data);

            setDetail((response.data.data));
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {

        fetchOptions();
    }, []);

    //Api call to get projets
    return <div className="pt-20">
        <div className="p-5 lg:flex lg:pt-20 lg:px-20 lg:space-x-10">
        </div>
    </div>
}

export default SearchPage;