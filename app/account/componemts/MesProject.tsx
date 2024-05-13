import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingShimmer from "./LoadingShimner";
import { project } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";
import ProjetCard from "@/components/ProjetCard";

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

      console.log(JSON.parse(userData).token);
      console.log(postData);

      const res = await axios.post(project.getProjetMeList, postData);
      console.log(res.data);

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
        <div className="flex flex-wrap space-y-2">
          {projet.map((item: any) => (
            <ProjetCard key={item.id} item={item} mdrow={"w-1/3"}></ProjetCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MesProject;
