import ReactHtmlParser from 'react-html-parser';

const DetailProject = ({ item}: any) => {

  return (
    <div className='lg:flex justify-between border border-primarycolor shadow-lg p-4'>
      <div>
        {ReactHtmlParser(item?.description)}
      </div>

      {item.video != null && <>

        <div className='hidden lg:block shadow-lg p-4 rounded-lg'>
          <iframe width="560" height="315" src={item.video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
        </div>

        <div className='lg:hidden shadow-lg rounded-lg'>
          <iframe src={item.video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
        </div>
      </>
      }

    </div>
  );
}

export default DetailProject;
