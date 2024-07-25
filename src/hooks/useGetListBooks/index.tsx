import { useQuery } from '@tanstack/react-query'
import { getBooks } from '@src/services/queries'

export const useGetListBooks = ({
  category = 'science fiction film',
  search
}: {
  category?: string
  search?: string
}) => {
  const {
    data,
    isFetching: isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['getBooks', search || category],
    queryFn: () => getBooks({ category, search }),
    enabled: false
  })

  return {
    data,
    isLoading,
    error,
    refetch
  }
}
