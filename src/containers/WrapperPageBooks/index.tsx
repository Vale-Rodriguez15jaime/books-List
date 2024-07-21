import Books from '@components/Books'
import SearchInput from '@containers/SearchInput'
import { useGetListBooksByCategory } from '@hooks/useGetListBooksByCategory'
import { FC } from 'react'

const WrapperPageBooks: FC = () => {
  const { isLoading, data } = useGetListBooksByCategory({})
  console.log('data', isLoading, data)

  return (
    <>
      <SearchInput setResponse={() => console.log('data')} />
      <Books books={data?.data?.items || []} />
    </>
  )
}

export default WrapperPageBooks
