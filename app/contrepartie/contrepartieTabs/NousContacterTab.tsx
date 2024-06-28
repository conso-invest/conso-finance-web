import { WhatsappIcon } from "next-share";

type NousContacterTabProps = {
    contactUs: () => void;
};

const NousContacterTab = ({ contactUs }: NousContacterTabProps) => {
    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-center text-2xl lg:font-bold lg:text-3xl mb-10">Nous contacter</h1>

            <p className="mb-6 text-center text-gray-600">
                Vous avez des questions ou souhaitez en savoir plus ? N'hésitez pas à nous contacter via WhatsApp.
            </p>
            <button
                className="flex items-center justify-center w-full p-4 text-lg font-bold text-white bg-green-500 rounded-lg shadow hover:bg-green-600"
                onClick={contactUs}
            >
                <WhatsappIcon className="w-6 h-6 mr-2" />
                CONTACTEZ NOUS
            </button>
        </div>
    );
};

export default NousContacterTab;
