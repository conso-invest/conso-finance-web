import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState, useEffect } from "react";
import { commentaire } from "@/lib/apiEndpoints";

const CommentProject = ({ item, id_projet_comment }: any) => {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (item && item.length > 0) {
      setComments(item);
    }
  }, [item]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (message.trim() === "") {
        setError("Le message est obligatoire");
        return;
      }

      setIsLoad(true);

      const userDatadd = localStorage.getItem("UserData") || "";
      const postData = {
        token: JSON.parse(userDatadd).token,
        message: message,
        id_projet: id_projet_comment,
        id_user: JSON.parse(userDatadd).id,
      };

      const response = await axios.post(commentaire.commentaire_send, postData);

      if (response.data.success) {
        // Ajouter le nouveau commentaire à l'état local
        const newComment = {
          id: response.data.id, // Assurez-vous que votre API retourne l'ID du nouveau commentaire
          user: {
            name: JSON.parse(userDatadd).name, // Nom de l'utilisateur à partir du localStorage
          },
          message: message,
        };

        setComments([...comments, newComment]); // Ajouter le nouveau commentaire à la liste actuelle

        setIsLoad(false);
        setMessage(""); // Efface le champ de message après envoi réussi
        setError(null); // Réinitialise les erreurs
        // Afficher un message de succès
        alert("Commentaire envoyé avec succès !");
      } else {
        setError(response.data.message || "Une erreur s'est produite");
        setIsLoad(false);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire :", error);
      setError("Une erreur s'est produite");
      setIsLoad(false);
    }
  };

  return (
    <>
      {comments.length === 0 && (
        <p className="text-center p-4">Aucun commentaire pour le moment</p>
      )}

      {comments.length > 0 &&
        comments.map((comment: any) => (
          <div
            key={comment.id}
            className="flex mb-5 items-center border border-primarycolor shadow-sm p-4 rounded-lg"
          >
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{comment.user.name}</h2>
              <p className="text-gray-600">{comment.message}</p>
            </div>
          </div>
        ))}

      <form onSubmit={handleSubmit} className="flex justify-center items-center bg-slate-200 p-2">
        <div className="w-full">
          <Input
            placeholder="Entrez votre commentaire"
            type="text"
            className="h-12 rounded-none rounded-tl-full rounded-bl-full"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="mt-4">
          <Button className="w-full h-12 text-lg rounded-none rounded-br-full rounded-tr-full  bg-primarycolor mb-4">
            {isLoad ? "Envoi en cours..." : "Envoyer"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CommentProject;
