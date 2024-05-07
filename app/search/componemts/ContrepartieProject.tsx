
const ContrepartieProject = ({ item }: any) => {

  return (
    <>
      {item?.length == 0 && <>
        <p className="text-center p-4">Aucun resultat</p>
      </>}

      {item?.length > 0 &&
        <div className="flex">
          <div>
            {item.map((item: any) =>
              <div className="w-3/6 shadow-sm mb-10 flex items-center border-b border-gray-200 p-4 rounded-lg" key={item.id}>
                <div className="w-full">
                  <div className="flex justify-between mb-7">
                    <div className="text-xl text-gray-600 font-bold">Pour {item.montant}Fcfa</div>
                    <button className="bg-secondarycolor px-4 py-2 rounded text-white">Choisir</button>
                  </div>
                  <img src={item.image} alt={item.titre} className="w-80 object-cover" />
                  <h2 className="text-lg font-semibold my-2">{item.titre} </h2>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-600">Date Livraison: {item.date_livraison}</p>
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
