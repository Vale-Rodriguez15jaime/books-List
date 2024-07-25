import axios from 'axios'
import { getBooks } from './index'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('getBooks', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('fetch books successfully with search', async () => {
    const mockData = { items: [], totalItems: 0, kind: 'books#volumes' }
    const response = { data: mockData, success: true }
    mockedAxios.get.mockResolvedValue({ data: mockData })

    const result = await getBooks({ search: 'Harry Potter' })

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://www.googleapis.com/books/v1/volumes',
      {
        params: { q: 'Harry Potter', maxResults: '40' }
      }
    )
    expect(result).toEqual(response)
  })

  it('fetch books successfully with category', async () => {
    const mockData = { items: [], totalItems: 0, kind: 'books#volumes' }
    const response = { data: mockData, success: true }
    mockedAxios.get.mockResolvedValue({ data: mockData })

    const result = await getBooks({ category: 'science fiction film' })

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://www.googleapis.com/books/v1/volumes',
      {
        params: { q: '+subject=science fiction film', maxResults: '40' }
      }
    )
    expect(result).toEqual(response)
  })

  it('handles errors from the API', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'))
    await expect(getBooks({ search: 'Harry Potter' })).rejects.toThrow('Network error')
  })
})
