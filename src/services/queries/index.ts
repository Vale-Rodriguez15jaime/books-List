import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getBooksByCategory = async (category: string) => {
    const { data } = await axios.get('https://www.googleapis.com/books/v1/volumes?q=+subject=horror&maxResults=10');
    return data;
}