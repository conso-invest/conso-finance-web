import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function Login() {
    return (
        <div className="pt-28 py-12 px-4 flex justify-center items-center lg:py-20 lg:px-32 lg:pt-36">
            <div className="shadow-lg p-8 w-full lg:w-3/6 lg:p-10">
                <p className="text-start font-bold text-2xl text-primarycolor">Bon retour ! </p>
                <p className="mt-2 mb-10 text-sm w-4/5 lg:w-3/5">Connectez-vous à votre espace conso finance en toute securitée</p>
                <div>
                    <label htmlFor="Nom" className="font-bold">Email</label>
                    <Input placeholder="" type="email" className="h-12" />
                </div>
                <div className="mt-8">
                    <label htmlFor="Nom" className="font-bold">Mot de passe</label>
                    <Input placeholder="" type="password" className="h-12" />
                </div>
                <div className="mt-16">
                    <Button className="w-full h-12 text-xl bg-secondarycolor">Connexion</Button>
                </div>
                <div className="mt-10 text-center">
                    <Link href="/register">Vous n&apo;savez pas de compte ? <span className="font-bold">Inscrivez-vous</span>   </Link>
                </div>
            </div>
            <div></div>

        </div>
    )
}

export default Login;
