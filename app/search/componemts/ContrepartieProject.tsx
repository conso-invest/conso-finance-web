
const ContrepartieProject = ({ item }: any) => {

  return (
    <>
      {item?.length == 0 && <>
        <p className="text-center p-4">Aucun resultat</p>
      </>}

      {item?.length > 0 &&
        <div className="flex">
          <div>
            <div className="mb-10">
              <h1 className="text-bold text-2xl mt-10">Choisissez vos contreparties</h1>
              <p className="mt-1">Soutenez la collecte et recevez des contreparties en échange.</p>
            </div>

            {item.map((item: any) =>
              <div className="w-3/6 border border-secondarycolor shadow-sm mb-10 flex items-center border-b border-gray-200 p-4 rounded-lg" key={item.id}>
                <div className="w-full">
                  <div className="flex justify-between mb-7">
                    <div className="text-xl text-gray-600 font-bold">Pour {item.montant}Fcfa</div>
                    <button className="bg-secondarycolor px-4 py-2 rounded text-white">Choisir</button>
                  </div>
                  <img src={item.image} alt={item.titre} className="w-80 object-cover" />
                  <h2 className="text-lg font-semibold my-2">{item.titre} </h2>
                  <div className="text-gray-600"
      dangerouslySetInnerHTML={{__html: item.description}}
    />
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
