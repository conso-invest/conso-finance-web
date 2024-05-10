import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingShimmer from "./LoadingShimner";
import { project } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";

const MesInvestissement = ({ item }: any) => {

    const [souscription, setSouscription] = useState<any>([]);
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
                
                const res = await axios.post(project.getProjetsouscription,postData);
                console.log(res.data);
                
                setSouscription(res.data.data);
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
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Demandes</h3>
        Mes demandes ici

        <div className="md:px-32 py-8 w-full">
  <div className="shadow overflow-hidden rounded border-b border-gray-200">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Project</th>
          <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Investor</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Package</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Amount</th>
        </tr>
      </thead>
    <tbody className="text-gray-700">
  
    {souscription.map((item: any) => (   <tr key={item.id}>
        <td className="w-1/3 text-left py-3 px-4">{item.projet.titre}</td>
        <td className="w-1/3 text-left py-3 px-4">{item.user.name}</td>
        <td className="text-left py-3 px-4"><a className="hover:text-blue-500" href="tel:622322662">{item.projet_contreparie.titre}</a></td>
        <td className="text-left py-3 px-4"><a className="hover:text-blue-500" href="mailto:jonsmith@mail.com">{item.montant} FCFA</a></td>
      </tr>))}
   
    
    </tbody>
    </table>
  </div>
</div>
    </div>
    );
  }
  
  export default MesInvestissement;
  