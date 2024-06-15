import { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';

const DetailProject = ({ item}: any) => {

  const [link, setLink] = useState("");

  useEffect(() => {
    if (item?.video) {
      const newLink = item?.video?.replace("watch?v=", "embed/");

      setLink(removeAfterAmpersand(newLink));
    }
  }, []);

  function removeAfterAmpersand(url:any) {
    const ampersandIndex = url.indexOf('&');
    if (ampersandIndex === -1) {
      // If no ampersand is found, return the original URL
      return url;
    }
    // Return the substring from the start to the ampersand index
    return url.substring(0, ampersandIndex);
  }


  return (
    <div className='lg:flex justify-between border border-primarycolor shadow-lg p-4'>
      <div>
        {ReactHtmlParser(item?.description)}
      </div>

      {item.video != null && <>

        <div className='hidden lg:block shadow-lg p-4 rounded-lg'>
          <iframe width="560" height="315" src={link} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
        </div>

        <div className='lg:hidden shadow-lg rounded-lg'>
          <iframe src={link} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
        </div>
      </>
      }

    </div>
  );
}

export default DetailProject;
