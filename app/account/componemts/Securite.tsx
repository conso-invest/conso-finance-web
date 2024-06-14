import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Securite = ({ item }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState<any>(null);

  const onSubmit = async (data:any) => {

    try {
      setIsLoad(true);

      // Validate passwords
      const { oldpassword, newpassword, password } = data;
      if (!oldpassword.trim() || !newpassword.trim() || !password.trim()) {
        setError("Tous les champs sont requis.");
        setIsLoad(false);
        return;
      }

      if (newpassword !== password) {
        setError("Les nouveaux mots de passe ne correspondent pas.");
        setIsLoad(false);
        return;
      }

      const userData = localStorage.getItem(UserData) || '';
      const postData = {
        token: JSON.parse(userData).token,
        newpassword: newpassword,
        oldpassword: oldpassword,
        password: password,
      };

      const response = await axios.post(auth.change_password, postData);

      if (response.data.success) {
        setIsLoad(false);
        toast.success("Le mot de passe a été modifié avec succès !");
        // Rediriger vers une route protégée après la modification réussie
        setTimeout(() => {
          window.location.href = "/account";
        }, 2000); // Rediriger après 2 secondes
      } else {
        setError(response.data.message);
        setIsLoad(false);
      }
    } catch (error) {
      console.error("Error while changing password:", error);
      setIsLoad(false);
      setError("Une erreur est survenue lors de la modification du mot de passe.");
    }
  };

  return (
    <div className="flex">
      <div className="bg-white p-8 shadow-lg lg:w-full lg:p-10">
        <p className="text-2xl font-bold text-start text-primarycolor">
          Modification du mot de passe
        </p>
        <p className="w-4/5 mt-2 mb-10 text-sm lg:w-3/5">
          Sécurisez votre compte
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mt-8">
            <label htmlFor="oldpassword" className="font-bold">
              Ancien mot de passe
            </label>
            <Input
              placeholder=""
              type="password"
              className="h-12"
              {...register("oldpassword", { required: true })}
            />
            {errors.oldpassword && <p className="text-red-500">Ce champ est requis.</p>}
          </div>
          <div className="mt-8">
            <label htmlFor="password" className="font-bold">
              Nouveau mot de passe
            </label>
            <Input
              placeholder=""
              type="password"
              className="h-12"
              {...register("password", { required: true })}
            />
            {errors.password && <p className="text-red-500">Ce champ est requis.</p>}
          </div>
          <div className="mt-8">
            <label htmlFor="newpassword" className="font-bold">
              Confirmez le mot de passe
            </label>
            <Input
              placeholder=""
              type="password"
              className="h-12"
              {...register("newpassword", { required: true })}
            />
            {errors.newpassword && <p className="text-red-500">Ce champ est requis.</p>}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-16">
            <Button className="w-full h-12 text-xl bg-secondarycolor">
              {isLoad ? "Traitement..." : "Modifier"}
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default Securite;
