"use client";
// pages/publish-request.js
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { auth, cat, profil, project } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";
import ImageInput from '@/components/ui/image';

const PublishRequestPage = () => {
  const [titre, setTitre] = useState('');
  const [sousTitre, setSousTitre] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [objectif, setObjectif] = useState('');
  const [description, setDescription] = useState('');
  const [idCategorie, setIdCategorie] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [category, setCategory] = useState<any>([]);
  const [user, setUser] = useState<any>({});



  const handleImageChange = (event: ChangeEvent<HTMLInputElement >) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
     
        if (file.size > 1000000) {
          setError('Le fichier est trop volumineux. Veuillez choisir un fichier de taille inférieure à 1 Mo.');
          return;
        }
        const fileUrl = URL.createObjectURL(file);
        setPreview(fileUrl);
        setImage(file);
        setError('');
      }
    
    }
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!titre || !sousTitre || !objectif || !description || !idCategorie || !image) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('titre', titre);
      formData.append('sous_titre', sousTitre);
      formData.append('image', image as Blob);
      formData.append('objectif', objectif);
      formData.append('description', description);
      formData.append('id_categorie', idCategorie);
      formData.append('token', user.token);

      const response = await axios.post( project.send_request, formData);

      console.log(response.data);
      // Redirect to a success page or display a success message
      setError('');
    } catch (error) {
      console.error(error);
      setError('Une erreur est survenue lors de l\'envoi de la demande. Veuillez réessayer.');
    }
  };

  useEffect(() => {
    const isConnected = () => {
      const userData = localStorage.getItem(UserData);
      console.log(JSON.parse(userData).token);
      
      setUser(JSON.parse(userData));
      
      return userData !== null;
    };
    // Check if the user is already logged in


    // If the user is already logged in, redirect them to the account page
    if (!isConnected()) {
      window.location.href = "/login";
    }
   
    
    const fetchCategory = async () => {
      try {
        const response = await axios.get(cat.list);
        setCategory(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div className="banner flex items-center justify-center px-4 py-12 pt-28 lg:py-20 lg:px-32 lg:pt-36">
    <div className="w-full p-8 shadow-lg lg:w-3/6 lg:p-10">
      <p className="text-2xl font-bold text-start text-primarycolor">
        Bienvenue sur Conso Finance{" "}
      </p>
      <h1>Publish a Project Request</h1>
      <form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="titre" className="font-bold">
      Titre
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
      Sous-titre
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
      <div className="relative">
        <Input
          placeholder=""
          type="file"
          className="h-12 w-full border rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onChange={handleImageChange} 
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 16v-4a6 6 0 0 1 12 0v4M8 9h12a2 2 0 0 1-2 2v5H8V9z" />
          </svg>
        </div>
        {!preview && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        )}
      </div>
      {preview && (
        <div className="mt-4">
          <img src={preview} alt="Preview" className="w-32 h-auto rounded-md w-32" />
        </div>
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  <div className="mt-8">
    <label htmlFor="objectif" className="font-bold">
      Objectif
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
    Description
  </label>
  <textarea
    className="w-full h-32 mt-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
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
  {error && <p className="text-red-500">{error}</p>}
  <div className="mt-16">
    <Button className="w-full h-12 text-xl bg-secondarycolor">
      Publier la demande
    </Button>
  </div>
</form>
      </div></div>
  );
};

export default PublishRequestPage;