import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function Register() {
    return (
        <div className="pt-28 py-12 px-4 flex justify-center items-center lg:py-20 lg:px-32 lg:pt-36">
            <div className="shadow-lg p-8 w-full lg:w-3/6 lg:p-10">
                <p className="text-start font-bold text-2xl text-primarycolor">Bienvenue sur Conso Finance </p>
                <p className="mt-2 mb-10 text-sm w-4/5 lg:w-3/5">Créez votre compte conso finance en toute securitée</p>
                <div className="lg:flex lg:justify-between">
                    <div className="mt-8 w-full mr-2">
                        <label htmlFor="Nom" className="font-bold">Nom</label>
                        <Input placeholder="" className="h-12" />
                    </div>
                    <div className="mt-8 w-full">
                        <label htmlFor="Prenom" className="font-bold">Prénom</label>
                        <Input placeholder="" className="h-12" />
                    </div>
                </div>

                <div className="mt-8">
                    <label htmlFor="Email" className="font-bold h-12">Email</label>
                    <Input placeholder="" type="email" className="h-12" />
                </div>
                <div className="mt-8">
                    <label htmlFor="Profil" className="font-bold">Votre profil</label>
                    <Input placeholder="" className="h-12" />
                </div>
                <div className="mt-8">
                    <label htmlFor="Mot de passe" className="font-bold">Mot de passe</label>
                    <Input placeholder="" type="password" className="h-12" />
                </div>
                <div className="mt-16">
                    <Button className="w-full h-12 text-xl bg-secondarycolor">M&apo;sinscrire</Button>
                </div>
                <div className="mt-10 text-center">
                    <Link href="/login">Vous avez déjà un compte ? <span className="font-bold">Connectez-vous</span></Link>
                </div>
            </div>
            <div></div>

        </div>
    )
}

export default Register;
