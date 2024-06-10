import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingShimmer from "./LoadingShimner";
import { project, auth } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";
import ProjetCard from "@/components/ProjetCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Securite = ({ item }: any) => {
  // const [projet, setProjet] = useState<ProjectRequest[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>(null);

  const validatePassword = (password: string) => {
    return password.length < 8 ? "Password must be at least 8 characters long." : null;
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();


    try {
      setIsLoad(true);

      if (!newpassword.trim() || !password.trim() || !oldpassword.trim()) {
        setError("Email and password are required.");
        return;
      }


      const passwordError = validatePassword(password);
      const oldpasswordError = validatePassword(oldpassword);
      const newpasswordError = validatePassword(newpassword);

      if (oldpasswordError || newpasswordError || passwordError) {
        setError(newpasswordError || passwordError || oldpasswordError);
        setIsLoad(false);
        return;
      }

      const userData = localStorage.getItem(UserData) || '';

      var postData = {
        "token": JSON.parse(userData).token,
        "newpassword": newpassword,
        "oldpassword": oldpassword,
        "password": password,
      };

      const response = await axios.post(auth.change_password, postData);


      if (response.data.success) {
        setIsLoad(false);

        // If the login attempt was successful, store the authentication token in local storage
        const data = response.data.data;
        // localStorage.setItem(UserData, JSON.stringify(data));
        // Redirect to a protected route
        window.location.href = "/account";
      } else {
        // If the login attempt was unsuccessful, display an error message
        setError(response.data.message);
        setIsLoad(false);
      }

    } catch (error: any) {
      //  console.log(error);
      setIsLoad(false);
      //setError(error.response.data.error);
    }
  };
  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <div className=" flex ">
      <div className="bg-white p-8 shadow-lg lg:w-3/6 lg:p-10">
        <p className="text-2xl font-bold text-start text-primarycolor">
          Modification du mot de passe!{" "}
        </p>
        <p className="w-4/5 mt-2 mb-10 text-sm lg:w-3/5">
          Connectez-vous à votre espace Conso Finance en toute sécurité.
        </p>
        <form onSubmit={handleSubmit}>

          <div className="mt-8">
            <label htmlFor="password" className="font-bold">
              Ancient mot de passe
            </label>
            <Input
              placeholder=""
              type="password"
              className="h-12"
              value={oldpassword}
              onChange={(event) => setOldPassword(event.target.value)}
            />
          </div>
          <div className="mt-8">
            <label htmlFor="password" className="font-bold">
              Mot de passe
            </label>
            <Input
              placeholder=""
              type="password"
              className="h-12"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mt-8">
            <label htmlFor="password" className="font-bold">
              Mot de passe
            </label>
            <Input
              placeholder=""
              type="password"
              className="h-12"
              value={newpassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-16">
            <Button className="w-full h-12 text-xl bg-secondarycolor">
              {isLoad ? "Traitement..." : "Ajouter"}
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Securite;
