import { notFound } from "next/navigation";

type Props = {
    params: {
        term: string,
    }
}

function SearchPage({ params: { term } }: Props) {
    console.log(term);
    if(!term) notFound();
    const termToUse = decodeURI(term);

    //Api call to get projets
    return <div>Search page {termToUse}</div>;
}

export default SearchPage;