import { UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

const MonProfil = ({ item }: any) => {

    const [userData, setUserData] = useState<any>(null);

    const getUserData = () => {
        const userData = localStorage.getItem("UserData");
        if (userData !== null) {
            setUserData(JSON.parse(userData));
        } else {
            setUserData(null);
        }
    };

    useEffect(() => { getUserData() }, []);

    return (
        <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Profil</h3>
            <div className="lg:flex justify-between shadow-sm rounded-md bg-white p-4">
                <div>
                    <h1 className="text-4xl font-bold">{userData?.name}</h1>
                    <h1 className="mb-4">{userData?.email}</h1>

                    <span className="font-bold text-primarycolor text-lg">Type de profil</span>
                    <h1 className="mb-4">{userData?.userprofil?.profil?.titre}</h1>

                    <span className="font-bold text-primarycolor text-lg">Statut du compte</span>
                    <h1 className={`${userData?.email_verified_at != null ? "text-green-800" : "text-red-500"} mb-4`}>{userData?.email_verified_at != null ? "Vérifié" : "Non Vérifié"}</h1>
                </div>

                <div className="flex items-center justify-center shadow-sm bg-slate-400 p-4 rounded-full h-40 w-40">
                    <UserIcon size={100} className="text-primarycolor"/>
                </div>

            </div>
        </div>
    );
}

export default MonProfil;
