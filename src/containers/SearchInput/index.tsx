import { ChangeEvent, useState, useEffect } from 'react'
import './SearchInput.css'

interface SearchInputProps {
  onCaptureSearchValue: Function
}

const SearchInput = ({ onCaptureSearchValue }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState('')

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value)
  }

  const handleSearch = () => {
    onCaptureSearchValue(searchValue)
  }

  return (
      <div className="search">
        <h1>GOOGLE BOOKS</h1>
        <input
          className="search-input"
          type="text"
          placeholder="Buscar un libro"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button className="search-button" onClick={handleSearch}>
          Buscar
        </button>
      </div>
  )
}

export default SearchInput
