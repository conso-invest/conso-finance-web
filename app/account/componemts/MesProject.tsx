import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingShimmer from "./LoadingShimner";
import { project } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";

interface ProjectRequest {
    id: number;
    titre: string;
    image: string;
    objectif: number;
    description: string;
    categorie: string;
    user: string;
    valide: boolean;
    comments: string;
  }
const openDetail=({slug}:any)=>{
    window.location.href = "/search/"+slug;
}
const MesProject = ({ item }: any) => {
    const [projet, setProjet] = useState<ProjectRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
    
  
  
      fetchData();
    }, []);
  
    const fetchData = async () => {
        const userData = localStorage.getItem(UserData) || '';

            if(userData!== null){
                var postData={
                    "token":JSON.parse(userData).token
                };
                console.log(JSON.parse(userData).token);
                console.log(postData); 
                
                const res = await axios.post(project.getProjetMeList,postData);
                console.log(res.data);
                
                setProjet(res.data.data);
                setLoading(false);
            }else{
                window.location.href = "/login";
            }
     
      };
    if (loading) {
      return <LoadingShimmer/> ;
    }
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        Demandes
      </h3>
      <section className="text-gray-700 body-font">
    <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
      {projet.map((item: any) => (
   /*   <div className="max-w-md mx-4 mb-4 shadow-md rounded overflow-hidden hover:cursor-pointer" key={item.id}>
      <Image
        src={item.image}
        alt={item.titre}
        width={400}
        height={200}
        className="w-full h-48 object-cover rounded-t"
      />
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-bold">{item.titre}</h2>
          <span
            className={`bg-${
              item.valide ? 'green' : 'blue'
            }-500 text-white px-2 py-1 rounded-full`}
          >
            {item.valide ? 'Validé' : 'En attente'}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <div className="flex justify-between">
          <p className="text-lg font-bold text-gray-800">{item.objectif} €</p>
          <p className="text-gray-600">{item.categorie}</p>
        </div>
      </div>
    </div> */
<div className="p-4 md:w-1/3 hover:cursor-pointer" key={item.id} onClick={()=>openDetail(item.slug)}>
  <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={item.image} alt="blog"/>
    <div className="p-6">
      <div className="flex justify-between mb-2">
        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">{item.categorie.titre}</h2>
        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">{item.souscription_amount} FCFA</h2>
        <span className={`bg-${
              item.valide ? 'green' : 'blue'
            }-500 text-white px-2 py-1 rounded-full`}>{item.souscription_amount<item.objectif ?"En Cours":"Complet"}</span>
      </div>
      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{item.titre}</h1>
      <p className="leading-relaxed mb-3">{item.description}</p>
      <div className="flex items-center flex-wrap ">
        <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Detail
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </a>
        <span className="text-gray-600 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-300">
          {item.objectif} FCFA
        </span>
        <span className="text-gray-600 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-300">
          <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>1.2K
        </span>
      
        <span className="text-gray-600 inline-flex items-center leading-none text-sm">
          <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.68.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
          </svg>6
        </span>
      </div>
    </div>
  </div>
</div>
      ))}
  </div>
  </div>
  </section>
    </div>
  );
};

export default MesProject;
