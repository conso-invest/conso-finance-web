import { redirect } from 'next/navigation'

import Image from "next/image";
import * as DOMPurify from 'dompurify'

const PublicationProject = ({ item }: any) => {


    return (
      <p>
         {item.length<=0? <h1>No data found</h1>:item.map((item:any)=>        <div key={item.id} className="flex items-center border-b border-gray-200 p-4 rounded-lg">
     
      <div className="flex-1">

        <h2 className="text-lg font-semibold">{item.titre} </h2>
        <div className="text-gray-600"
      dangerouslySetInnerHTML={{__html: item.description}}
    />
   
      </div>
    </div> )}
  

      </p>
    );
}

export default PublicationProject;
