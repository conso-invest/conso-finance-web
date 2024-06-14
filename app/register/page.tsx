'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState, useRef, ForwardedRef } from "react";
import { auth, profil } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";
import { useForm } from "react-hook-form";
import PhoneInput, { CountryData, PhoneInputProps } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ToastContainer, toast } from "react-toastify";

interface RegisterFormData {
  name: string;
  prenom: string;
  telephone: string;
  id_profil: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface PhoneInputWithRefProps extends PhoneInputProps {
  forwardedRef: ForwardedRef<HTMLInputElement>;
}

const PhoneInputWithRef = React.forwardRef<HTMLInputElement, PhoneInputWithRefProps>((props, ref) => {
  const { forwardedRef, ...rest } = props;

  return <PhoneInput {...rest} inputProps={{ ref: forwardedRef }} />;
});

function Register() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegisterFormData>();
  const [options, setOptions] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isConnected = () => {
      const userData = localStorage.getItem(UserData);
      return userData !== null;
    };

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

  const onSubmit = async (data: RegisterFormData) => {
    const { name, prenom, email, id_profil, password, passwordConfirm, telephone } = data;

    // Check if telephone is undefined
    if (!telephone) {
      toast.error("Numéro de téléphone invalide");
      return;
    }

    try {
      setLoading(true);

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
        toast.success("Compte crée avec succès !");
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

  const handlePhoneChange = (value: string, data: {} | CountryData, event: any, formattedValue: string) => {
    setValue("telephone", value);
    if (phoneInputRef.current) {
      phoneInputRef.current.value = formattedValue;
    }
  };

  return (
    <div className="banner flex items-center justify-center px-4 py-12 pt-28 lg:py-20 lg:px-32 lg:pt-36">
      <div className="bg-white p-8 shadow-lg lg:w-3/6 lg:p-10">
        <p className="text-2xl font-bold text-start text-primarycolor">
          Bienvenue sur Conso Finance{" "}
        </p>
        <p className="w-4/5 mt-2  text-sm lg:w-3/5">
          Créez votre compte Conso Finance en toute sécurité.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:flex lg:justify-between">
            <div className="w-full mt-8 mr-2">
              <label htmlFor="name" className="font-bold">
                Nom
              </label>
              <Input
                placeholder=""
                className="h-12"
                {...register("name", { required: "Ce champ est requis" })}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div className="w-full mt-8">
              <label htmlFor="prenom" className="font-bold">
                Prénom
              </label>
              <Input
                placeholder=""
                className="h-12"
                {...register("prenom", { required: "Ce champ est requis" })}
              />
              {errors.prenom && <p className="text-red-500">{errors.prenom.message}</p>}
            </div>
          </div>
          <div className="lg:flex lg:justify-between lg:space-x-2">
            <div className="w-full mt-8">
              <label htmlFor="telephone" className="h-12 font-bold">
                Téléphone
              </label>
              <PhoneInputWithRef
                forwardedRef={phoneInputRef}
                ref={phoneInputRef}
                country={'cm'}
                onChange={handlePhoneChange}
                inputStyle={{ width: '100%', height: "50px" }}
                inputProps={{
                  name: "telephone",
                  required: true,
                  autoFocus: false,
                }}
              />
              {errors.telephone && <p className="text-red-500">{errors.telephone.message}</p>}
            </div>
            <div className="mt-8">
              <label htmlFor="id_profil" className="font-bold">
                Votre profil
              </label>
              <select
                {...register("id_profil", { required: "Ce champ est requis" })}
                className="h-12 w-full rounded  border-slate-300"
              >
                {options.map((option: any) => (
                  <option key={option.id} value={option.id}>
                    {option.titre}
                  </option>
                ))}
              </select>
              {errors.id_profil && <p className="text-red-500">{errors.id_profil.message}</p>}
            </div>
          </div>
          <div className="mt-8">
            <label htmlFor="email" className="h-12 font-bold">
              Email
            </label>
            <Input
              placeholder=""
              type="email"
              className="h-12"
              {...register("email", { required: "Ce champ est requis" })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="mt-8">
            <label htmlFor="password" className="font-bold">
              Mot de passe
            </label>
            <Input
              placeholder=""
              type="password"
              className="h-12"
              {...register("password", { required: "Ce champ est requis", minLength: { value: 8, message: "Le mot de passe doit contenir au moins 8 caractères." } })}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className="mt-8">
            <label htmlFor="passwordConfirm" className="font-bold">
              Confirmer le mot de passe
            </label>
            <Input
              placeholder=""
              type="password"
              className="h-12"
              {...register("passwordConfirm", {
                required: "Ce champ est requis",
                validate: value =>
                  value === watch('password') || "Les mots de passe ne correspondent pas"
              })}
            />
            {errors.passwordConfirm && <p className="text-red-500">{errors.passwordConfirm.message}</p>}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-16">
            {loading ? (
              <Button className="w-full h-12 text-xl bg-secondarycolor" disabled>
                Loading ...
              </Button>
            ) : (
              <Button className="w-full h-12 text-xl bg-secondarycolor" type="submit">
                M'inscrire
              </Button>
            )}
          </div>
        </form>
        <div className="mt-10 text-center">
          <Link href="/login">
            Vous avez déjà un compte ?{" "}
            <span className="font-bold">Connectez-vous</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
