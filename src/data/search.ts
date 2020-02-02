import axios from 'axios';

export interface ISearchResult {
    title: string,
    url: string,
    image: string,
    distillery: string,
    abv: number
}

export const search = (terms: string) => axios
    .get<ISearchResult[]>(`/.netlify/functions/search?terms=${terms}`)
    .then(results => results.data);
