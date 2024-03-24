import Image from "next/image";

function Hero() {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center py-4 px-4 pt-28 lg:pt-32 lg:px-20 bg-blue-100">
            <div className="w-full lg:w-3/4">
                <h1 className="text-3xl lg:text-6xl font-extrabold leading-tight">Donnez des ailes <br /> <span className="text-primarycolor"> aux bonnes idées</span></h1>
                <div className="flex items-center mt-2 lg:mt-10">
                    <div className="h-12 w-1 lg:h-16 lg:w-1.5 bg-red-400 mr-4"></div>
                    <p className="text-sm lg:text-xl font-bold">Le meilleur service pour se lancer, <br /> se former et financer des projets</p>
                </div>
            </div>

            <div className="mt-10 lg:w-3/6 relative">
                <Image width={1020}
                    height={680} alt="banner" src="https://images.ctfassets.net/guty4ttb9vho/4DWq49imTfQHjiqatiKRo0/b722cd17c2aaf27f92e39b35f2d12626/fany-africa-blossom.png?w=1020&q=100&fm=webp" />
                <div className="absolute bottom-0 right-0 bg-white p-4 text-sm w-40 lg:w-72 rounded shadow-sm"><p>Après sa formation Ulule, France a lancé la gamme d&apos;accessoires de soin de la peau</p> </div>
            </div>
        </div>
    )
}

export default Hero;
