
const ContributionProject = ({ item }: any) => {

  return (
    <>
      {item?.length <= 0 ? <h1>Aucune contribution pour le moment</h1> : item.map((item: any) =>
        <div key={item.id} className="flex items-center border border-primarycolor shadow-lg p-4 rounded-lg">
          <div className="my-4">
            <h2 className="text-lg"><span className="font-bold">{item?.user?.name}</span> à contribué {item?.montant} Fcfa </h2>
          </div>
        </div>)}
    </>
  );
}

export default ContributionProject;
