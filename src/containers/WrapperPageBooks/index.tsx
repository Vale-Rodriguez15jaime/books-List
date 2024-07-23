import Books from '@components/Books'
import Loader from '@components/Loader'
import SearchInput from '@containers/SearchInput'
import { useGetListBooks } from '@hooks/useGetListBooks'
import { FC, useEffect, useState } from 'react'

const WrapperPageBooks: FC<{ isActionable?: boolean }> = ({ isActionable }) => {
  const [search, setSearch] = useState<string | undefined>(undefined)
  const { isLoading, data, refetch } = useGetListBooks({ search })

  useEffect(() => {
    void refetch()
  }, [search])

  return (
    <>
      <SearchInput onCaptureSearchValue={(currentSearch: string) => setSearch(currentSearch)} />
      {isLoading ? <Loader /> : <Books books={data?.data?.items || []} isActionable={isActionable} />}
    </>
  )
}

export default WrapperPageBooks
