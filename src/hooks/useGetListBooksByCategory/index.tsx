import { useQuery } from '@tanstack/react-query';
import { getBooksByCategory } from 'src/services/queries';

export const useGetListBooksByCategory = (category: string) => {
  const {
    data,
    isFetching: isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['getByCategory', category],
    queryFn: () => getBooksByCategory(category)
  });

  return {
    data,
    isLoading,
    error,
    refetch
  };
};
