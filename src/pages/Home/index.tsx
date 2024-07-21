import { useGetListBooksByCategory } from '@hooks/useGetListBooksByCategory'
import { FC } from 'react'

const Home: FC = () => {
  const { isLoading, data } = useGetListBooksByCategory('horror')
  console.log('data', isLoading, data)

  return <div>Hola</div>
}

export default Home
