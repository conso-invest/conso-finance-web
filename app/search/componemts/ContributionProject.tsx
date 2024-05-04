import { redirect } from 'next/navigation'

import Image from "next/image";
import * as DOMPurify from 'dompurify'

const ContributionProject = ({ item }: any) => {


    return (
      <p>
         {item.length<=0? <h1>No data found</h1>:item.map((item:any)=>        <div key={item.id} className="flex items-center border-b border-gray-200 p-4 rounded-lg">
  {/*     <img src={process.env.NEXT_PUBLIC_IMG_URL+"/"+item.image}  alt={item.titre} className="w-20 h-20 object-cover mr-4" /> */}
      <div className="flex-1">

        <h2 className="text-lg font-semibold">{item.user.name} </h2>
        <p className="text-gray-600">{item.user.email}</p>
        <div className="text-right mt-2">
          <div className="text-sm text-gray-600">{item.montant} Fcfa</div>
        </div>
      </div>
    </div> )}
  

      </p>
    );
}

export default ContributionProject;
