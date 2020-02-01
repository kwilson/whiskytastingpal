import axios from 'axios';

export interface IWhiskyDetails {
    title: string,
    notes: Array<{ title: string, value: string }>,
    image: string,
    description: string,
    rating: string
}

export const getDetails = (id: string) => axios
    .get<IWhiskyDetails[]>(`/.netlify/functions/details?id=${id}`)
    .then(results => results.data);
