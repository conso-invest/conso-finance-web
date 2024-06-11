
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { UserData } from "@/lib/const";
import { project,auth,commentaire } from "@/lib/apiEndpoints";

const CommentProject = ({ item,id_projet_comment }: any) => {
  const [error, setError] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);


  const getUserData = () => {
    const userDatadd = localStorage.getItem("UserData") || '';
    if (userData !== null) {
        setUserData(JSON.parse(userDatadd));
    } else {
        setUserData(null);
    }
    console.log(JSON.parse(userData).token);

};
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
    if (message=="") {
      setError("le message est obligatoire");
      setIsLoad(false);
      return;
    }
    const userDatadd = localStorage.getItem("UserData") || '';
    console.log(JSON.parse(userDatadd).token);

    var postData = {
      "token": JSON.parse(userDatadd).token,
      "message": message,
      "id_projet": id_projet_comment,
      "id_user": JSON.parse(userDatadd).id,
    };
    console.log(postData);

    const response = await axios.post(commentaire.commentaire_send, postData);


    if (response.data.success) {
    setIsLoad(false);

      // If the login attempt was successful, store the authentication token in local storage
      //const data = response.data.data;
     // localStorage.setItem(UserData, JSON.stringify(data));
      // Redirect to a protected route
    //  window.location.href = "/account";
    } else {
      // If the login attempt was unsuccessful, display an error message
      setError(response.data.message);
      setIsLoad(false);
    }
  } catch (e: any) {
      console.log(e);
    setIsLoad(false);
    setError("Une erreur c'est produite");
  }

  };

  return (
    <>
      {item?.length == 0 && <>
        <p className="text-center p-4">Aucun commentaire pour le moment</p>
      </>}

      {item.length > 0 &&  item.map((item: any) =>
        <div key={item.id} className="flex mb-5 items-center border border-primarycolor shadow-lg p-4 rounded-lg">
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{item.user.name} </h2>
            <p className="text-gray-600">{item.message}</p>
          </div>
        </div>
      )}
         <form onSubmit={ handleSubmit}>
   

 
     <div className="mt-8">
      
       <Input
         placeholder=""
         type="text"
         className="h-12"
         value={message}
         onChange={(event) => setMessage(event.target.value)}
       />
     </div>
     {error && <p className="text-red-500">{error}</p>}
     <div className="mt-16">
       <Button className="w-full h-12 text-xl bg-secondarycolor">
         {isLoad ? "Traitement..." : "Envoyer"}
       </Button>
     </div>
   </form>
    </>
  );
}

export default CommentProject;
