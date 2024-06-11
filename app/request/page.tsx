"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ChangeEvent, useEffect, useState } from "react";
import { auth, cat, profil, project } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";
import { BookAIcon, ChefHatIcon, SunIcon, UsersIcon } from "lucide-react";

const PublishRequestPage = () => {
  const [titre, setTitre] = useState("");

  const [sousTitre, setSousTitre] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [objectif, setObjectif] = useState("");
  const [description, setDescription] = useState("");
  const [idCategorie, setIdCategorie] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<any>();
  const [category, setCategory] = useState<any>([]);
  const [user, setUser] = useState<any>({});
  const [isLoad, setIsLoad] = useState(false);
  const [isLoadDetail, setIsLoadDetail] = useState(false);

  function getQueryParam(param: string): string {
    // Create a new URL object from the current URL
    const urlObj: URL = new URL(window.location.href);

    // Get the search parameters from the URL
    const params: URLSearchParams = new URLSearchParams(urlObj.search);

    // Get the value of the specified parameter
    const value: string | null = params.get(param);

    // Check if the parameter is null and handle it
    if (value === null) {
      return "";
    }

    return value;
  }


  const getDataCurrent = async (id: any) => {
    try {

      setIsLoadDetail(true);

      const response = await axios.post(project.get_curent_request(id));
      console.log(response.data);
      if (response.data.success) {
        setIsLoadDetail(false);

        setTitre(response.data.data.titre);
        setSousTitre(response.data.data.sous_titre);

        setObjectif(response.data.data.objectif);
        setDescription(response.data.data.description);
        setIdCategorie(response.data.data.id_categorie);
        //   setError("");
        setPreview(response.data.data.image);
      } else {
        window.location.href = "/request";
      }
      //window.location.href = "/";
      // Redirect to a success page or display a success message
      // setError("");
      //  setImage<File | null>(null);

      /*       setTitre("");
            setSousTitre("");
        
            setObjectif("");
            setDescription("");
            setIdCategorie("");
            setError("");
            setPreview<string | null>(null); */
    } catch (error) {
      console.error(error);

      window.location.href = "/request";

      setIsLoadDetail(false);

    }
  }

  // Usage example:
  const type: string | null = getQueryParam('type');
  const id: string | null = getQueryParam('id');



  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 1000000) {
          setError(
            "Le fichier est trop volumineux. Veuillez choisir un fichier de taille inférieure à 1 Mo."
          );
          return;
        }
        const fileUrl = URL.createObjectURL(file);
        setPreview(fileUrl);
        setImage(file);
        setError("");
      }
    }
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !titre ||
      !objectif ||
      !description ||
      !idCategorie
    ) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {

      setIsLoad(true);

      const formData = new FormData();
      formData.append("titre", titre);
      formData.append("sous_titre", sousTitre);


      if (image && getQueryParam('id') == null) {
        formData.append("image", image as Blob);
      } else if (image == null && getQueryParam('id') != null) {
        formData.append("image", preview);
      } else if (image != null && getQueryParam('id') != null) {
        formData.append("image", image as Blob);
      } else if (image != null && getQueryParam('id') == null) {
        formData.append("image", image as Blob);
      } else {
        formData.append("image", image as Blob);
      }



      formData.append("objectif", objectif);
      formData.append("description", description);
      formData.append("id_categorie", idCategorie);
      formData.append("token", user.token);
      formData.append("user_id", user.id);

      console.log(getQueryParam('id') == null ? project.send_request : project.send_request + "/" + getQueryParam('id'));

      const response = await axios.post(getQueryParam('id') == null ? project.send_request : project.send_request + "/" + getQueryParam('id'), formData);

      setIsLoad(false);
      // window.location.href = "/";
      if (getQueryParam('id') !== null) {
        console.log('Type:', type); // Output: edit (if the URL is 'http://localhost:3000/request?type=edit&&id=1')
        console.log('ID:', id); // Output: 1 (if the URL is 'http://localhost:3000/request?type=edit&&id=1')
        getDataCurrent(getQueryParam('id'));

      }
      // Redirect to a success page or display a success message
      setError("");
    } catch (error) {
      console.error(error);
      setIsLoad(false);
      setError(
        "Une erreur est survenue lors de l'envoi de la demande. Veuillez réessayer."
      );
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(project.getAllCategory);
      setCategory(response.data.data);
      setIdCategorie(response.data.data[0]?.id);
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

  useEffect(() => {
    checkIfIsConnected();
    fetchCategory();

    try {

      if (getQueryParam('id') !== null) {
        console.log('Type:', type); // Output: edit (if the URL is 'http://localhost:3000/request?type=edit&&id=1')
        console.log('ID:', id); // Output: 1 (if the URL is 'http://localhost:3000/request?type=edit&&id=1')
        getDataCurrent(getQueryParam('id'));

      }

      console.log('Type:', type); // Output: edit (if the URL is 'http://localhost:3000/request?type=edit&&id=1')
      console.log('ID:', id); // Output: 1 (if the URL is 'http://localhost:3000/request?type=edit&&id=1')
    } catch (error) {

      if (getQueryParam('id') == null) {
        // setIsLoadDetail(false);
      }
      console.error(error);
    }

  }, []);

  return (
    <div className="banner px-4 py-12 pt-28 lg:py-20 lg:px-24 lg:pt-36">
      <div className="w-full flex flex-col justify-center items-center mb-20">
        <p className="text-2xl lg:text-6xl font-extrabold text-center text-primarycolor">
          Lancez-vous sur  consofinance
        </p>
        <h1 className="text-md mb-2 lg:mb-5 my-4 lg:text-xl">{`Prenez quelques minutes pour le décrire afin qu'on puisse vous accompagner au mieux`}</h1>
      </div>

      <div className="w-full">
        <div className="space-x-2 lg:flex justify-between lg:space-x-10">
          <form onSubmit={isLoad ? () => null : handleSubmit} className="p-8 bg-white shadow-lg lg:p-10">
            <div>
              <label htmlFor="titre" className="font-bold">
                Que voulez-vous financer ?
              </label>
              <Input
                placeholder=""
                type="text"
                className="h-12"
                value={titre}
                onChange={(event) => setTitre(event.target.value)}
              />
            </div>
            <div className="mt-8">
              <label htmlFor="sous_titre" className="font-bold">
                Nom du projet / Entreprise
              </label>
              <Input
                placeholder=""
                type="text"
                className="h-12"
                value={sousTitre}
                onChange={(event) => setSousTitre(event.target.value)}
              />
            </div>
            <div className="mt-8">
              <label htmlFor="image" className="font-bold mb-2">
                Image
              </label>
              <div className="flex flex-col items-center justify-center lg:p-2 border-2 border-dashed border-gray-300 rounded-md">
                <Input
                  placeholder=""
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
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
                placeholder=""
                type="number"
                className="h-12"
                value={objectif}
                onChange={(event) => setObjectif(event.target.value)}
              />
            </div>
            <div className="mt-8">
              <label htmlFor="description" className="font-bold">
                Palez nous de vous et du projet
              </label>
              <textarea
                className="p-2 w-full h-32 mt-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="mt-8">
              <label htmlFor="id_categorie" className="font-bold">
                Catégorie
              </label>
              <Select
                value={idCategorie}
                onChange={(event) => setIdCategorie(event.target.value)}
              >
                {category.map((option: any) => (
                  <option key={option.id} value={option.id}>
                    {option.titre}
                  </option>
                ))}
              </Select>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
            <div className="mt-4">
              <Button className="w-full h-12 text-xl bg-secondarycolor">
                {isLoad ? "Traitement..." : " Envoyer ma demande"}
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

    </div>
  );
};

export default PublishRequestPage;
