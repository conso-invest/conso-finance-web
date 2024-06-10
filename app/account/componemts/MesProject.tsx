import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingShimmer from "./LoadingShimner";
import { project } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";
import ProjetCard from "@/components/ProjetCard";
import Link from "next/link";

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

const openDetail = ({ slug }: any) => {
  window.location.href = "/search/" + slug;
}

const MesProject = ({ item }: any) => {
  const [projet, setProjet] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userData = localStorage.getItem(UserData) || '';

    if (userData !== null) {
      var postData = {
        "token": JSON.parse(userData).token,
        "id_owner": JSON.parse(userData).id,
      };

      const res = await axios.post(project.getProjetMeList, postData);


      setProjet(res.data.data);
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
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        Mes projets
      </h3>
      <section className="text-gray-700 body-font">
        {projet.length == 0 &&
          <div className="bg-white py-10 text-center text-xl">
            <h1 className="mb-8">{`Vous n'avez aucun projet sur consofinance.`}</h1>
            <Link href={`/request`} className="text-sm lg:text-md bg-primarycolor text-white rounded p-4">Soumettre un projet</Link>
          </div>
        }

        <div className="flex flex-wrap space-y-2">
          {projet.map((item: any) => (
            <ProjetCard key={item.id} item={item} ></ProjetCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MesProject;
