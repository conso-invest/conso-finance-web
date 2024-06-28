import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Modal from "@/components/ui/modal";

type FormInputs = {
    collaborationType: string;
    duration: number;
    durationUnit: string;
    description: string;
    expectedReturn: string;
};

type Props = {
    projectId: string;
};

function TravaillerAvecNousTab({ projectId }: Props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setLoading(true);

        const postData = {
            ...data,
            projectId,
        };

        try {
            const response = await axios.post("/api/submitCollaboration", postData);
            // Show success modal
            setShowModal(true);
            reset();
        } catch (error) {
            // Handle error
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-center text-2xl lg:font-bold lg:text-3xl mb-10">Travailler avec nous</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="collaborationType" className="block font-medium">
                        Forme de collaboration
                    </label>
                    <select
                        id="collaborationType"
                        {...register("collaborationType", { required: true })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select...</option>
                        <option value="Stage">Stage</option>
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="Consultant">Consultant</option>
                        <option value="Partenaire">Partenaire</option>
                    </select>
                    {errors.collaborationType && <p className="text-red-500">This field is required</p>}
                </div>

                <div>
                    <label htmlFor="duration" className="block font-medium">
                        Durée
                    </label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            id="duration"
                            {...register("duration", { required: true, min: 1 })}
                            className="w-1/2 p-2 border rounded"
                            placeholder="Durée"
                        />
                        <select
                            id="durationUnit"
                            {...register("durationUnit", { required: true })}
                            className="w-1/2 p-2 border rounded"
                        >
                            <option value="">Select...</option>
                            <option value="days">Jours</option>
                            <option value="months">Mois</option>
                            <option value="years">Années</option>
                        </select>
                    </div>
                    {errors.duration && <p className="text-red-500">This field is required</p>}
                    {errors.durationUnit && <p className="text-red-500">This field is required</p>}
                </div>

                <div>
                    <label htmlFor="description" className="block font-medium">
                        Description
                    </label>
                    <textarea
                        id="description"
                        {...register("description", { required: true })}
                        className="w-full p-2 border rounded"
                        placeholder="Décrire brièvement ce que vous pouvez apporter au projet"
                    />
                    {errors.description && <p className="text-red-500">This field is required</p>}
                </div>

                <div>
                    <label htmlFor="expectedReturn" className="block font-medium">
                        Contrepartie attendue
                    </label>
                    <textarea
                        id="expectedReturn"
                        {...register("expectedReturn", { required: true })}
                        className="w-full p-2 border rounded"
                        placeholder="Contrepartie attendue"
                    />
                    {errors.expectedReturn && <p className="text-red-500">This field is required</p>}
                </div>

                <button
                    type="submit"
                    className={`w-full h-12 p-2 rounded ${loading ? "bg-gray-400" : "bg-primarycolor text-white"}`}
                    disabled={loading}
                >
                    {loading ? "Envoi..." : "Soumettre"}
                </button>
            </form>

            {showModal && (
                <Modal
                    id="default-modal"
                    title="Demande envoyée"
                    content={[
                        "Votre demande a été envoyée avec succès. Nos équipes vous contacteront dans les plus brefs délais. Consofinance vous remercie de votre confiance.",
                    ]}
                    acceptBtn={() => {
                        setShowModal(false);
                        reset();
                    }}
                    declineBtn={() => {
                        setShowModal(false);
                        reset();
                    }}
                />
            )}
        </div>
    );
}

export default TravaillerAvecNousTab;
