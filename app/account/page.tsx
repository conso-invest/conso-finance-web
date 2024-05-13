"use client";
import { DnaIcon } from "lucide-react";
import { useEffect, useState } from "react";
import MonProfil from "./componemts/MonProfil";
import MesProject from "./componemts/MesProject";
import MesInvestissement from "./componemts/MesInvestissement";
import MesDemande from "./componemts/MesDemande";
import { UserData } from "@/lib/const";

function Account() {

    const [activeTabs, setActiveTabs] = useState(1);

    var tabsData = [
        { id: 1, name: "Profil", icon: <DnaIcon /> },
        { id: 2, name: "Mes demandes", icon: <DnaIcon /> },
        { id: 3, name: "Mes projets", icon: <DnaIcon /> },
        { id: 4, name: "Mes investisements", icon: <DnaIcon /> },
    ]

    return (<>
        <div className="h-full  px-4 py-12 pt-28 lg:py-20 lg:px-32 lg:pt-36">
            <h3 className="mb-8 text-lg font-bold text-gray-900 dark:text-white">Mon compte</h3>
            <div className="md:flex">
                <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                    {tabsData.map((tabs: any) => {
                        return <>
                            <li className="cursor-pointer" onClick={() => setActiveTabs(tabs.id)}>
                                <a className={`${activeTabs === tabs?.id ? "bg-primarycolor" : "bg-gray-800"} inline-flex items-center px-4 py-3 text-white rounded-lg active w-full dark:bg-blue-600`} aria-current="page">
                                    <svg className="w-4 h-4 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        {tabs.icon}
                                    </svg>
                                    {tabs.name}
                                </a>
                            </li></>
                    })}

                </ul>
                <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full min-h-screen">
                    {activeTabs === 1 && <>
                        <MonProfil item={activeTabs} />
                    </>}
                    {activeTabs === 2 && <>
                        <MesDemande item={activeTabs} />
                    </>}
                    {activeTabs === 3 && <>
                        <MesProject item={activeTabs} />   </>}
                    {activeTabs === 4 && <>
                        <MesInvestissement item={activeTabs} />
                    </>}
                </div>
            </div>


        </div>

    </>)
}

export default Account;