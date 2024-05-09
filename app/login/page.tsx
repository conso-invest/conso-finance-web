// Add this line at the top of your file
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { auth } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>(null);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setError(emailError || passwordError);
      return;
    }

    try {
      const response = await axios.post(auth.login, {
        email,
        password,
      });
      console.log(response.data);
      if (response.data.success) {
        // If the login attempt was successful, store the authentication token in local storage
        const data = response.data.data;
        localStorage.setItem(UserData, JSON.stringify(data));
        // Redirect to a protected route
        window.location.href = "/account";
      } else {
        // If the login attempt was unsuccessful, display an error message
        setError(response.data.message);
      }
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email).toLowerCase()) ? "Please enter a valid email address." : null;
  };

  const validatePassword = (password: string) => {
    return password.length < 8 ? "Password must be at least 8 characters long." : null;
  };

  useEffect(() => {
    const isConnected = () => {
      const userData = localStorage?.getItem("UserData");
      return userData !== null;
    };
    // Check if the user is already logged in


    // If the user is already logged in, redirect them to the account page
    if (isConnected()) {
      window.location.href = "/account";
    }
  }, []);

  return (
    <div className="banner flex items-center justify-center px-4 py-12 pt-28 lg:py-20 lg:px-32 lg:pt-36">
      <div className="w-full p-8 shadow-lg lg:w-3/6 lg:p-10">
        <p className="text-2xl font-bold text-start text-primarycolor">
          Bon retour!{" "}
        </p>
        <p className="w-4/5 mt-2 mb-10 text-sm lg:w-3/5">
          Connectez-vous à votre espace Conso Finance en toute sécurité.
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <Input
              placeholder=""
              type="email"
              className="h-12"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-16">
            <Button className="w-full h-12 text-xl bg-secondarycolor">
              Connexion
            </Button>
          </div>
        </form>
        <div className="mt-10 text-center">
          <Link href="/register">
            {"Vous n'avez pas de compte?"}{" "}
            <span className="font-bold">Inscrivez-vous</span>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
