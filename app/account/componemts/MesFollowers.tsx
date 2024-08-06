import axios from "axios";
import { useState, useEffect } from "react";
import { project } from "@/lib/apiEndpoints";
import { UserData } from "@/lib/const";
import Link from "next/link";
import { formatNumber } from "@/app/utils";
import LoadingShimmer from "./LoadingShimner";

const MesFollowers = ({ item }: any) => {

    const [followers, setFollowers] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData();
    }, []);

    const decodeJson = (data: any) => {
        try {
            if (typeof data === 'string') {
                return JSON.parse(data);
            }
            return data;
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return [];
        }
    }

    const fetchData = async () => {
        const userData = localStorage.getItem(UserData) || '';

        if (userData) {
            const parsedUserData = JSON.parse(userData);
            const postData = {
                token: parsedUserData.token,
                id: parsedUserData.id,
                following_id: parsedUserData.id,
            };

            try {
                const res = await axios.post(project.followers, postData);
                setFollowers(res.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        } else {
            window.location.href = "/login";
        }
    };

    if (loading) {
        return <LoadingShimmer />;
    }

    return (
        <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Mes Followers</h3>
            <div className="py-5 w-full">
                {followers.length === 0 &&
                    <div className="bg-white py-10 text-center text-xl">
                        <h1 className="mb-8">Vous n'avez aucun followers pour le moment</h1>
                    </div>
                }

                {followers.map((item: any) => (
                    <div key={item.id} className="shadow-sm rounded my-2 w-full bg-white p-4 cursor-pointer">
                        <div className="w-full">
                            <div className="flex justify-start items-start">
                                <div className="w-full">
                                    <h1 className="font-bold mb-4">{item.followers?.name}</h1>
                                    <h1 className="font-bold">{item.followers?.email}</h1>
                                </div>
                            </div>
                            <hr className="mb-4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MesFollowers;
