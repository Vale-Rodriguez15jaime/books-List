import axios from 'axios'
import { getListBooksResponseSchema } from '../interfaces'

export const getBooksByCategory = async ({
  category,
  maxResults = '40'
}: {
  category?: string
  maxResults?: string
}) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=+subject=${category}&maxResults=${maxResults}`
    )
    return getListBooksResponseSchema.safeParse(data)
  } catch (error) {
    console.log('error!')
    throw error
  }
}
