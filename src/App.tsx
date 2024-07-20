import React from 'react'
import SearchInput from './components/SearchInput'
import {BookType} from './components/Book'
import Books from './components/Books'

interface Response {
  data?: {
    items: BookType[]
  }
}

const App = () =>  {
  const [response, setResponse] = React.useState<Response>({})
  return (
    <div>
      <SearchInput setResponse={setResponse} />
	    {response.data && <Books books={response.data.items} /> }
    </div>
  )
}


export default App
