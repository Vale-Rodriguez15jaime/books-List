import axios from 'axios'
import { getListBooksResponseSchema } from '../interfaces'

export const getBooks = async ({
  category,
  search,
  maxResults = '40'
}: {
  category?: string
  maxResults?: string
  search?: string
}) => {
  let params = {}
  if (search) {
    params = { q: search }
  } else {
    params = {
      q: `+subject=${category}`
    }
  }
  try {
    const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
      params: { ...params, maxResults }
    })
    return getListBooksResponseSchema.safeParse(data)
  } catch (error) {
    throw error
  }
}
