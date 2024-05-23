import { useRouter } from "next/navigation";

const ContrepartieProject = ({ item }: any) => {

  const router = useRouter();


  const getAllContrepartie = async () => {
    router.push(`/contrepartie/${item.slug}`, item);
  }

  return (
    <>
      {item?.contrepartie.length == 0 && <>
        <p className="text-center p-4">Aucune contrepartie pour le moment</p>
      </>}

      {item?.contrepartie.length > 0 &&
        <div className="flex">
          <div>
            <div className="mb-10">
              <h1 className="text-bold text-2xl">Choisissez vos contreparties</h1>
              <p className="mt-1">Soutenez la collecte et recevez des contreparties en échange.</p>
            </div>

            {item.contrepartie.map((item: any) =>
              <div className="w-full lg:w-96 border shadow-sm mb-10 flex items-center border-b border-gray-200 p-4 rounded-lg" key={item.id}>
                <div className="w-full">
                  <div className="flex justify-between mb-7">
                    <div className="text-xl text-gray-600 font-bold">Pour {item.montant} FCFA</div>
                    <button className="bg-primarycolor px-4 py-2 rounded-full text-white" onClick={() => getAllContrepartie()}>Choisir</button>
                  </div>
                  <img src={item.image} alt={item.titre} className="w-80 object-cover" />
                  <h2 className="text-lg font-semibold my-2">{item.titre} </h2>
                  <div className="text-gray-600"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                  <p className="text-gray-600 mt-2">Date Livraison: {item.date_livraison}</p>
                </div>
              </div>
            )}
          </div>

          <div>

          </div>

        </div>

      }

    </>
  );
}

export default ContrepartieProject;
