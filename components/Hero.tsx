import Image from "next/image";
import './Header.css';

function Hero() {
    return (
        <div className="banner flex flex-col lg:flex-row justify-between items-center px-4 pt-28 lg:pt-20 lg:px-20">
            <div className="w-full lg:w-4/6 lg:px-5">
                <h1 className="text-3xl lg:text-6xl font-extrabold leading-tight text-secondarycolor">Accélérez la croissance <br /> <span className="text-primarycolor"> de votre entreprise</span></h1>
                <div className="flex items-center mt-2 lg:mt-10">
                    <div className="h-12 w-1 lg:h-28 lg:w-1.5 bg-primarycolor mr-4"></div>
                    <p className="text-sm w-2/4 lg:text-2xl text-secondarycolor">La plateforme de finance digitale et inclusive qui révolutionne le monde des TPE et PME.</p>
                </div>
            </div>

            <div className="lg:w-2/6 relative">
                <img width={520}
                    height={280} alt="banner" src="../projet-owner.png" />
                <div className="absolute bottom-0 right-0 bg-white p-4 text-sm w-40 lg:w-72 rounded shadow-sm"><p>{"Après sa formation Conso Finance, Audray a lancé la gamme d'accessoires de soin de la peau"}</p> </div>
            </div>
        </div>
    )
}

export default Hero;
