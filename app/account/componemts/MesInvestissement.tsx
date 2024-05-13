import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingShimmer from "./LoadingShimner";
import { project } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";
import Link from "next/link";

const MesInvestissement = ({ item }: any) => {

  const [souscription, setSouscription] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userData = localStorage.getItem(UserData) || '';

    if (userData !== null) {
      console.log(userData);
      var postData = {
        "token": JSON.parse(userData).token,
        "id": JSON.parse(userData).id,
      };

      console.log(JSON.parse(userData).token);
      console.log(postData);


      const res = await axios.post(project.getProjetsouscription, postData);
      console.log(res.data);

      setSouscription(res.data.data);
      setLoading(false);

    } else {
      window.location.href = "/login";
    }

  };
  if (loading) {
    return <LoadingShimmer />;
  }
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Mes investisements</h3>
      <div className="py-5 w-full">
        {souscription.length == 0 &&
          <div className="bg-white p-10 text-center text-xl">
            <h1 className="mb-8">{`Vous éffectué aucun investissement pour le moment`}</h1>
            <Link href={`/`} className="bg-primarycolor text-white rounded p-4">Trouver des projets rentables</Link>
          </div>
        }

        {souscription.map((item: any) => (<div key={item.id} className="shadow-sm rounded my-2 w-full bg-white p-4 cursor-pointer">
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
            <div className="contrepartie">
              <span className="font-bold text-primarycolor">Contre partie</span>
              <h1 className="text-xl mb-2">{item.projet_contreparie.titre}</h1>
              <p>{item.montant} FCFA</p>
            </div>
          </div>

        </div>
        ))}

      </div>
    </div>
  );
}

export default MesInvestissement;
