import { formatNumber } from "@/app/utils";

const ContributionProject = ({ item }: any) => {

  return (
    <>
      {item?.length == 0 && <>
        <p className="text-center p-4">Aucune contribution pour le moment</p>
      </>}

      {item?.length > 0 &&   item.map((item: any) =>
        <div key={item.id} className="flex mb-5 items-center border border-primarycolor shadow-lg p-4 rounded-lg">
          <div className="my-4">
            <h2 className="text-lg"><span className="font-bold">{item?.user?.name}</span> à contribué {formatNumber(item?.montant)}FCFA</h2>
          </div>
        </div>)}
    </>
  );
}

export default ContributionProject;
