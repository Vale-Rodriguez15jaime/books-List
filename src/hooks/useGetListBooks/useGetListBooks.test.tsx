import { renderHook } from '@testing-library/react-hooks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { jest } from '@jest/globals'
import { useGetListBooks } from './index'
import { act, FC, ReactNode } from 'react'
import { mockBook } from '@src/constants'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const queryClient = new QueryClient()

const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useGetListBooks test', () => {
  beforeEach(() => {
    mockedAxios.get.mockClear()
  })
  it('fetch data successfully', async () => {
    const mockData = { items: [mockBook], totalItems: 0, kind: 'books#volumes' }
    const response = { data: mockData, success: true }
    mockedAxios.get.mockResolvedValue({ data: mockData })

    const { result, waitFor } = renderHook(
      () => useGetListBooks({ category: 'science fiction film' }),
      {
        wrapper
      }
    )

    act(() => {
      result.current.refetch()
    })
    await waitFor(() => expect(result.current.data?.success).toBe(true))

    expect(result.current.data).toEqual(response)
    expect(result.current.isLoading).toBe(false)
  })

  it('handles errors', async () => {
    const errorMessage = 'Failed to fetch'
    mockedAxios.get.mockRejectedValue(new Error(errorMessage))

    const { result, waitFor } = renderHook(() => useGetListBooks({ category: 'horror' }), {
      wrapper
    })
    act(() => {
      result.current.refetch()
    })
    await waitFor(() => result.current.isLoading === false)

    expect(result.current.data).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
  })
})
