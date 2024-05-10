
const PublicationProject = ({ item }: any) => {

  return (
    <>
      {item?.length == 0 && <>
        <p className="text-center p-4">Aucune publication pour le moment</p>
      </>}

      {item?.length > 0 &&
        item?.map((item: any) =>
          <div key={item.id} className="flex mb-5 items-center border border-primarycolor p-4 rounded-lg shadow-md">
            <div className="flex-1" >
              <h2 className="text-lg font-semibold">{item.titre} </h2>
              <div className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          </div>)
      }
    </>
  );
}

export default PublicationProject;
