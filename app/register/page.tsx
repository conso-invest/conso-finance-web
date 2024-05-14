// Add this line at the top of your file
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Select } from "@/components/ui/select";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { auth, profil } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";

function Register() {
  const [name, setName] = useState<any>("");
  const [prenom, setPrenom] = useState<any>("");
  const [telephone, setTelephone] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [id_profil, setProfile] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [error, setError] = useState<any>("");
  const [options, setOptions] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const isConnected = () => {
      const userData = localStorage.getItem(UserData);
      return userData !== null;
    };
    // Check if the user is already logged in


    // If the user is already logged in, redirect them to the account page
    if (isConnected()) {
      window.location.href = "/";
    }
    
    const fetchOptions = async () => {
      try {
        const response = await axios.get(profil.list);
        setOptions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    if (!name || !prenom || !email || !id_profil || !password || !telephone) {
      setLoading(false);

      setError("Tous les champs sont requis.");
      return;
    }

    if (!validateEmail(email)) {
      setLoading(false);

      setError("S'il vous plaît entrer une adresse e-mail valide.");
      return;
    }

    if (password.length < 8) {
      setLoading(false);

      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    try {
      
      const response = await axios.post(auth.register, {
        name,
        prenom,
        email,
        id_profil,
        password,
        telephone,
      });
      if (response.data.success) {

        const data = response.data.data;
        localStorage.setItem(UserData, JSON.stringify(data));
        // Redirect to login page
        window.location.href = "/";
      } else {
        setLoading(false);

        setError(response.data.message);
      }
    } catch (error) {
      setLoading(false);

      setError(
        "Une erreur s'est produite lors de l'inscription. Veuillez réessayer plus tard."
      );
    }
  };

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="banner flex items-center justify-center px-4 py-12 pt-28 lg:py-20 lg:px-32 lg:pt-36">
      <div className="bg-white p-8 shadow-lg lg:w-3/6 lg:p-10">
        <p className="text-2xl font-bold text-start text-primarycolor">
          Bienvenue sur Conso Finance{" "}
        </p>
        <p className="w-4/5 mt-2 mb-10 text-sm lg:w-3/5">
          Créez votre compte Conso Finance en toute sécurité.
        </p>
        <div className="lg:flex lg:justify-between">
          <div className="w-full mt-8 mr-2">
            <label htmlFor="Nom" className="font-bold">
              Nom
            </label>
            <Input
              placeholder=""
              className="h-12"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full mt-8">
            <label htmlFor="Prenom" className="font-bold">
              Prénom
            </label>
            <Input
              placeholder=""
              className="h-12"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-8">
          <label htmlFor="Telephone" className="h-12 font-bold">
            Telephone
          </label>
          <Input
            placeholder=""
            type="text"
            className="h-12"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <div className="mt-8">
          <label htmlFor="Profil" className="font-bold">
            Votre profil
          </label>
          <Select
            value={id_profil}
            onChange={(e) => setProfile(e.target.value)}
            className="h-12"
          >
            {options.map((option: any) => (
              <option key={option.id} value={option.id}>
                {option.titre}
              </option>
            ))}
          </Select>
        </div>
        <div className="mt-8">
          <label htmlFor="Email" className="h-12 font-bold">
            Email
          </label>
          <Input
            placeholder=""
            type="email"
            className="h-12"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-8">
          <label htmlFor="Mot de passe" className="font-bold">
            Mot de passe
          </label>
          <Input
            placeholder=""
            type="password"
            className="h-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-16">
          {loading ? (
            <Button className="w-full h-12 text-xl bg-secondarycolor">
              {"Loading ..."}
            </Button>
          ) : (
            <Button
              className="w-full h-12 text-xl bg-secondarycolor"
              onClick={handleSubmit}
            >
              {"M'inscrire"}
            </Button>
          )}
        </div>
        <div className="mt-10 text-center">
          <Link href="/login">
            Vous avez déjà un compte ?{" "}
            <span className="font-bold">Connectez-vous</span>
          </Link>
        </div>

      </div>
      <div></div>
    </div>
  );
}

export default Register;
