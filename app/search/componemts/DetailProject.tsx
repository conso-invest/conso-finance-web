import ReactHtmlParser from 'react-html-parser';

const DetailProject = ({ item }: any) => {
  return (
    <div className='border border-primarycolor shadow-lg p-4'>
      {ReactHtmlParser(item)}
    </div>
  );
}

export default DetailProject;
