"use client";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";
import axios from "axios";
import { Timer, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

const MonProfil = ({ item }: any) => {

    const [userData, setUserData] = useState<any>(null);
    const [verificationStape, setStape] = useState<any>(1);
    const [otp, setOtp] = useState<any>(null);
    const [sendOtpIsLoad, setSendOtpIsLoad] = useState<any>(false);
    const [verifyOtpIsLoad, setVerifyOtpIsLoad] = useState<any>(false);
    const [error, setError] = useState<any>(null);

    const getUserData = () => {
        const userData = localStorage.getItem("UserData");
        if (userData !== null) {
            setUserData(JSON.parse(userData));
        } else {
            setUserData(null);
        }
    };

    const LogOut = async () => {
        await localStorage.removeItem("UserData");
        window.location.href = "/";
    }

    const sendOtp = async () => {

        try {

            setSendOtpIsLoad(true);

            const response = await axios.post(auth.sendOTP, {
                'email': userData?.email,
                'token': userData?.token,
                'user_id': userData?.id,
            });

            setTimeout(() => {
                setSendOtpIsLoad(false);
            }, 10000);

            setStape(2);
        } catch (error) {
            sendOtpIsLoad(false);
        }
    }


    const verifyOtp = async () => {

        try {

            setVerifyOtpIsLoad(true);

            const response = await axios.post(auth.verifyOTP, {
                'email': userData.email,
                'otp': otp,
            });

            if (response.data.success) {
                const data = response.data.data;
                localStorage.setItem(UserData, JSON.stringify(data));
                setVerifyOtpIsLoad(false);
            } else {
                setError('Code de vérification invalide');
                setVerifyOtpIsLoad(false);
            }

        } catch (error) {
            setVerifyOtpIsLoad(false);
        }
    }

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

                    {userData?.email_verified_at == null && <>
                        {verificationStape == 2 ? <div className="mt-8 lg:w-80">
                            <label htmlFor="sous_titre" className="">
                                <span className="font-bold">Entrez le code de vérification</span> {` recu par mail  à l'adresse`}   {userData?.email}
                            </label>
                            <Input
                                placeholder="Code"
                                type="number"
                                className="h-12 w-full mt-2"
                                maxLength={6}
                                value={otp}
                                onChange={(event) => {
                                    setOtp(event.target.value);
                                    setError(null);
                                }}
                            />
                            <span className="text-sm text-red-500">{error != null ? error : ""}</span>
                            <button className="mt-2 mb-2 w-full bg-primarycolor px-4 py-2 rounded text-white" onClick={() => verifyOtpIsLoad ? null : verifyOtp()}>{verifyOtpIsLoad ? "Traitement..." : "Confirmer"}</button>

                            <span>{`Vous n'avez pas reçu de code ?`}</span>  <strong className="cursor-pointer" onClick={() => sendOtpIsLoad ? null : sendOtp()}> {sendOtpIsLoad ? "Vérifiez votre email" : "Renvoyer"} </strong>
                        </div> :
                            <div>
                                <button className="mt-2 w-full bg-primarycolor px-4 py-2 rounded text-white" onClick={() => sendOtpIsLoad ? null : sendOtp()}  > {sendOtpIsLoad ? "Traitement..." : "Véfifier mon compte"}</button>
                            </div>
                        }
                    </>
                    }
                </div>

                <div className="flex items-center justify-center shadow-sm bg-slate-400 p-4 rounded-full h-40 w-40 mt-10 lg:mt-2">
                    <UserIcon size={100} className="text-primarycolor" />
                </div>

            </div>
            <div className="bg-white p-4 mt-2 flex justify-center items-center">
                <button className="font-bold" onClick={() => LogOut()} >Déconnexion</button>
            </div>
        </div>
    );
}

export default MonProfil;
