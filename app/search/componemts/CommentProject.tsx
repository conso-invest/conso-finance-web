
const CommentProject = ({ item }: any) => {
  return (
    <p>
      {item.length <= 0 ? <h1>No data found</h1> : item.map((item: any) => <div key={item.id} className="flex items-center border-b border-gray-200 p-4 rounded-lg">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{item.user.name} </h2>
          <p className="text-gray-600">{item.message}</p>
        </div>
      </div>
      )}
    </p>
  );
}

export default CommentProject;