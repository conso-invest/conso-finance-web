"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { project } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";
import { BookAIcon, ChefHatIcon, SunIcon, UsersIcon } from "lucide-react"
import Modal from "@/components/ui/modal";

function PublishRequestPage() {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  const [image, setImage] = useState<any>(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<any>();
  const [category, setCategory] = useState<any>([]);
  const [user, setUser] = useState<any>({});
  const [isLoad, setIsLoad] = useState(false);
  const [isLoadDetail, setIsLoadDetail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  

  function getQueryParam(param: string): string {
    const urlObj: URL = new URL(window.location.href);
    const params: URLSearchParams = new URLSearchParams(urlObj.search);
    const value: string | null = params.get(param);
    return value === null ? "" : value;
  }

  const getDataCurrent = async (id: any) => {
    try {
      setIsLoadDetail(true);
      const response = await axios.post(project.get_curent_request(id));
      if (response.data.success) {
        setIsLoadDetail(false);
        setValue("titre", response.data.data.titre);
        setValue("sousTitre", response.data.data.sous_titre);
        setValue("objectif", response.data.data.objectif);
        setValue("description", response.data.data.description);
        setValue("idCategorie", response.data.data.id_categorie);
        setPreview(response.data.data.image);
      }
    } catch (error) {
      setIsLoadDetail(false);
      console.error(error);
    }
  }

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 1000000) {
        setError("Le fichier est trop volumineux. Veuillez choisir un fichier de taille inférieure à 1 Mo.");
        return;
      }
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
      setImage(file);
      setError("");
    }
  };

  const onSubmit = async (data: any) => {
    
    if (!data.titre || !data.objectif || !data.description || !data.idCategorie) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      setIsLoad(true);
      const formData = new FormData();
      formData.append("titre", data.titre);
      formData.append("sous_titre", data.sousTitre);
      if (image) {
        formData.append("image", image as Blob);
      }
      formData.append("objectif", data.objectif);
      formData.append("description", data.description);
      formData.append("id_categorie", data.idCategorie);
      formData.append("token", user.token);
      formData.append("user_id", user.id);

      const response = await axios.post(project.send_request, formData);
      setIsLoad(false);
      setError("");
      reset(); // Reset the form
      setPreview(null); // Clear the image preview
      setImage(null); // Clear the image state
      setShowModal(true);
    } catch (error) {
      console.error(error);
      setIsLoad(false);
      setError("Une erreur est survenue lors de l'envoi de la demande. Veuillez réessayer.");
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(project.getAllCategory);
      setCategory(response.data.data);
      setValue("idCategorie", response.data.data[0]?.id);
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfIsConnected = () => {
    const userData = localStorage.getItem(UserData) || '';
    if (userData != '') {
      setUser(JSON.parse(userData));
    } else {
      window.location.href = "/login";
    }
  };

  const init = () => {
    if (getQueryParam('id')) {
      getDataCurrent(getQueryParam('id'));
    }
  }

  useEffect(() => {
    checkIfIsConnected();
    fetchCategory();
    init();
  }, []);

  return (
    <div className="banner px-4 py-12 pt-28 lg:py-20 lg:px-24 lg:pt-36">
      <div className="w-full flex flex-col justify-center items-center mb-20">
        <p className="text-2xl lg:text-6xl font-extrabold text-center text-primarycolor">
          Lancez-vous sur consofinance
        </p>
        <h1 className="text-md mb-2 lg:mb-5 my-4 lg:text-xl">{`Prenez quelques minutes pour le décrire afin qu'on puisse vous accompagner au mieux`}</h1>
      </div>

      <div className="w-full">
        <div className="space-x-2 lg:flex justify-between lg:space-x-10">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 bg-white shadow-lg lg:p-10">
            <div>
              <label htmlFor="titre" className="font-bold">
                Que voulez-vous financer ?
              </label>
              <Input
                {...register("titre", { required: true })}
                placeholder=""
                type="text"
                className="h-12"
              />
              {errors.titre && <p className="text-red-500">Ce champ est requis</p>}
            </div>
            <div className="mt-8">
              <label htmlFor="sousTitre" className="font-bold">
                Nom du projet / Entreprise
              </label>
              <Input
                {...register("sousTitre", { required: true })}
                placeholder=""
                type="text"
                className="h-12"
              />
               {errors.sousTitre && <p className="text-red-500">Ce champ est requis</p>}
            </div>
            <div className="mt-8">
              <label htmlFor="image" className="font-bold mb-2">
                Image
              </label>
              <div className="flex flex-col items-center justify-center lg:p-2 border-2 border-dashed border-gray-300 rounded-md">
                <Input
                  type="file"
                  className="sr-only" id="file-input" onChange={handleImageChange}
                />
                <label
                  htmlFor="file-input"
                  className="flex flex-col items-center justify-center bg-white rounded-md cursor-pointer hover:bg-gray-100"
                >
                  {preview && (
                    <div className="w-full rounded-lg">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-80 rounded-lg object-contain"
                      />
                    </div>
                  )}
                  {!preview && (
                    <div className="mt-4 items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mt-2 text-gray-500 p-2">
                        Choisissez des fichiers à télécharger ou faites-les glisser ici <br />
                        <span className="font-bold">Taille maximale acceptée : 1 Mo</span>
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="mt-8">
              <label htmlFor="objectif" className="font-bold">
                Budget souhaité
              </label>
              <Input
                {...register("objectif", { required: true })}
                placeholder=""
                type="number"
                className="h-12"
              />
              {errors.objectif && <p className="text-red-500">Ce champ est requis</p>}
            </div>
            <div className="mt-8">
              <label htmlFor="description" className="font-bold">
                Palez nous de vous et du projet
              </label>
              <textarea
                {...register("description", { required: true })}
                className="p-2 w-full h-32 mt-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
              />
              {errors.description && <p className="text-red-500">Ce champ est requis</p>}
            </div>
            <div className="mt-8">
              <label htmlFor="idCategorie" className="font-bold">
                Catégorie
              </label>
              <Select
                {...register("idCategorie", { required: true })}
              >
                {category.map((option: any) => (
                  <option key={option.id} value={option.id}>
                    {option.titre}
                  </option>
                ))}
              </Select>
              {errors.idCategorie && <p className="text-red-500">Ce champ est requis</p>}
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
            <div className="mt-4">
              <Button className="w-full h-12 text-xl bg-secondarycolor">
                {isLoad ? "Traitement..." : "Envoyer ma demande"}
              </Button>
            </div>
          </form>
          <div className="w-5/6 lg:w-3/6">
            <h1 className="mt-8 lg:mt-0 text-center text-2xl mb-12 lg:text-5xl lg:text-start font-extrabold text-secondarycolor">{`Consofinance, c’est bien plus qu’une collecte de fonds`}</h1>
            <div className="flex items-center space-x-8">
              <div className="p-4 bg-primarycolor flex justify-center items-center rounded-full">
                <ChefHatIcon size={50} className="text-white" />
              </div>
              <div className="w-80">
                <span className="font-bold text-xl text-secondarycolor">Accompagnement personnalisé</span>
                <p className="mt-2">Notre équipe vous conseille tout au long de votre collecte de fonds.</p>
              </div>
            </div>
            <div className="flex items-center space-x-8 my-16">
              <div className="p-4 bg-primarycolor flex justify-center items-center rounded-full">
                <BookAIcon size={50} className="text-white" />
              </div>
              <div className="w-80">
                <span className="font-bold text-xl text-secondarycolor">Formation sur demande</span>
                <p className="mt-2">Pour aller plus loin, vous pouvez intégrer une de nos formations crowdfunding, webmarketing ou entrepreneuriat.</p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="p-4 bg-primarycolor flex justify-center items-center rounded-full">
                <SunIcon size={50} className="text-white" />
              </div>
              <div className="w-80">
                <span className="font-bold text-xl text-secondarycolor">79% de taux de succès</span>
                <p className="mt-2">8 collectes sur 10 atteignent et souvent dépassent leur objectif !</p>
              </div>
            </div>
            <div className="flex items-center space-x-8 my-16">
              <div className="p-4 bg-primarycolor flex justify-center items-center rounded-full">
                <UsersIcon size={50} className="text-white" />
              </div>
              <div className="w-80">
                <span className="font-bold text-xl text-secondarycolor">Agrandir sa communauté</span>
                <p className="mt-2">Portez plus loin et plus haut la voix de votre collecte !</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <Modal
        id="default-modal"
        title="Demande envoyée"
        content={[
          "Votre demande a été envoyée avec succès. Nous l'étudierons avec soin et vous contacterons dans les plus brefs délais. Consofinance vous remercie de votre confiance",
        ]}
        acceptBtn={() => {
          setShowModal(false);
        }}
        declineBtn={() => {
          setShowModal(false);
        }}
      />
      }
    </div>
  );
};

export default PublishRequestPage;
