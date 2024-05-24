import { Mail, MapIcon, Phone } from "lucide-react";
import Link from "next/link";

function Footer() {
    return (
        <div className="py-12 px-8  flex flex-col lg:flex-row justify-between items-start lg:py-20 lg:px-32 lg:pt-36 bg-secondarycolor text-white">
            <div className="mb-10 lg:mb-0 lg:w-1/3">
                <h1 className="mb-4 font-bold text-primarycolor">Qui sommes nous ?</h1>
                <p className="mr-4">Conso Finance est la première plateforme camerounaise de financement participatif créée en 2024.</p>
                <h1 className="mt-8 font-bold text-primarycolor">Suivez-nous sur </h1>
                <div className="mt-4">
                    <Link href="https://web.facebook.com/ConsoFinance">Facebook</Link>
                </div>
                <div className="mt-2">
                    <Link href="https://www.linkedin.com/company/consofinance">LinkedIn</Link>
                </div>
            </div>
            <div className="mb-10 lg:mb-0">
                <h1 className="mb-4 font-bold text-primarycolor">Conso Finance Crowdfunding</h1>
                <div>
                    <Link href="/request">Lancer un projet</Link>
                </div>
                <div className="mt-2">
                    <Link href="/">Voir tous les projets</Link>
                </div>
                <div className="mt-2">
                    <Link href="/">Toutes les catégories</Link>
                </div>
                <h1 className="mt-8 font-bold text-primarycolor">Autres </h1>
                <div className="mt-2">
                    <Link href="/">Projets à la une</Link>
                </div>
            </div>
            <div className="mb-10 lg:mb-0">
                <h1 className="mb-4 font-bold text-primarycolor">Nous contacter</h1>
                <div>
                    <Link href="mailto:contact@consofinance.com" className="flex"><Mail className="mr-2 w-4 text-primarycolor"/> contact@consofinance.com</Link>
                </div>
                <div className="my-4">
                    <Link href="tel:+237670184640" className="flex"><Phone className="mr-2 w-4 text-primarycolor"/>  (+237) 670 184 640</Link>
                </div>
                <div className="mt-2">
                    <Link href="https://maps.app.goo.gl/XyW7bEwHEk8w1LDr8"  target="_blank" className="flex"><MapIcon className="mr-2 w-4 text-primarycolor"/>  Titi garage - Yaoundé</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;
