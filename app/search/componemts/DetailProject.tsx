import { redirect } from 'next/navigation'

import Image from "next/image";
import * as DOMPurify from 'dompurify'

const DetailProject = ({ item }: any) => {


    return (
      <p>
          <h1 className="font-bold ">Detail du project</h1>
        {DOMPurify.sanitize(item) }

      </p>
    );
}

export default DetailProject;
