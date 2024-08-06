import axios from "axios";
import { useState, useEffect } from "react";
import { project } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";
import Link from "next/link";
import { formatNumber } from "@/app/utils";
import LoadingShimmer from "./LoadingShimner";

const MesInvestissement = ({ item }: any) => {

  const [souscription, setSouscription] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const decodeJson = (data: any) => {
    try {
      if (typeof data === 'string') {
        return JSON.parse(data);
      }
      return data;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  }

  const fetchData = async () => {
    const userData = localStorage.getItem(UserData) || '';

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const postData = {
        token: parsedUserData.token,
        id: parsedUserData.id,
      };

      try {
        const res = await axios.post(project.getProjetsouscription, postData);
        setSouscription(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    } else {
      window.location.href = "/login";
    }
  };

  if (loading) {
    return <LoadingShimmer />;
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Mes investissements</h3>
      <div className="py-5 w-full">
        {souscription.length === 0 &&
          <div className="bg-white py-10 text-center text-xl">
            <h1 className="mb-8">Vous n'avez effectué aucun investissement pour le moment</h1>
            <Link href="/" className="text-sm lg:text-md bg-primarycolor text-white rounded p-4">Trouver des projets</Link>
          </div>
        }

        {souscription.map((item: any) => (
          <div key={item.id} className="shadow-sm rounded my-2 w-full bg-white p-4 cursor-pointer">
            <div className="w-full">
              <div className="flex justify-start items-start">
                <div className="w-full">
                  <span className="font-bold text-primarycolor">Projet</span>
                  <h1 className="font-bold mb-4">{item.projet.titre}</h1>

                  <span className="text-primarycolor font-bold">Promoteur</span>
                  <h1 className="font-bold">{item.projet?.owner?.name}</h1>
                </div>
                <div className="h-40 w-40">
                  <img src={item.projet?.image} className="w-full rounded-md h-full object-fill mt-5" alt="image" />
                </div>
              </div>
              <hr className="mb-4" />
              {
                decodeJson(item?.contrepartie_data)?.length === 0 && (
                  <h1>Aucune contrepartie : <strong>Vous avez fait un don de {formatNumber(item?.montant)} FCFA</strong></h1>
                )
              }

              {decodeJson(item?.contrepartie_data)?.map((data: any) => (
                <div key={data.id} className="contrepartie">
                  <span className="font-bold text-primarycolor">Contrepartie</span>
                  <h1 className="text-xl mb-2">{data?.titre}</h1>
                  <p>{formatNumber(data?.montant)} FCFA</p>
                  <p>Date de livraison : {data?.date_livraison}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MesInvestissement;
