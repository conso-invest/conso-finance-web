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

const MesDemande = ({ item }: any) => {
  const [projectRequests, setProjectRequests] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {



    fetchData();
  }, []);

  const fetchData = async () => {
    const userData = localStorage.getItem(UserData) || '';

    if (userData !== null) {
      var postData = {
        "token": JSON.parse(userData).token,
        "user_id": JSON.parse(userData).id,
      };
      console.log(JSON.parse(userData).token);
      console.log(postData);

      const res = await axios.post(project.getProjetdemande, postData);
      console.log(res.data);

      setProjectRequests(res.data.data);
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
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        Mes Demandes
      </h3>
      <section className="text-gray-700 body-font">
        <div className="flex flex-wrap">
          {projectRequests.map((item: any) => (
            <div key={item.id} className="shadow-sm rounded my-2 w-full bg-white p-4 cursor-pointer">
              <div className="w-full">
                <div className="flex justify-start items-start">
                  <div className="w-full">
                    <h1 className="text-primarycolor font-bold">{item.category.titre}</h1>
                    <h1 className="text-primarycolor font-bold">Besion : {item.objectif} FCFA</h1>
                  </div>
                  <div className="h-20 w-20">
                    <img src={item.image} className="w-full rounded-full h-full object-cover mt-5" alt="image" />
                  </div>
                </div>
                <hr  className="mb-4"/>

                <h1 className="text-2xl mb-2">{item.titre}</h1>
                <p>{item.description}</p>
              </div>

            </div>
          ))}
        </div>

      </section>
    </div>
  );
};

export default MesDemande;
