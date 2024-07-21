import React, {ChangeEvent} from 'react'
import axios from 'axios'
import './SearchInput.css'

interface SearchInputProps {
  setResponse: Function
}

const SearchInput = ({setResponse}: SearchInputProps) => {
  const [searchValue, setSearchValue] = React.useState('')

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value)
  }

  function getBooks(title: string = 'javascript') {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
      .then((response) => setResponse(response))
  }

  React.useEffect(() => {
    getBooks()
  }, [])

  return (
    <div className="search">
      <h1>GOOGLE BOOKS</h1>
      <input
        className="search-input"
        type="text"
        placeholder="Buscar un libro"
        value={searchValue}
        onChange={handleInputChange}
      />
      <button className="search-button" onClick={() => getBooks(searchValue)}>
        Buscar
      </button>
    </div>
  );
}

export default SearchInput
