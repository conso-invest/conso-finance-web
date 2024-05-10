
const CommentProject = ({ item }: any) => {
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
    </>
  );
}

export default CommentProject;
