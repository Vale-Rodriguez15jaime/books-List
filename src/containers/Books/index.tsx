import { useState, useEffect } from 'react'
import Book from '../Book'
import './books.css'
import { BookItemType } from 'src/services/interfaces'
import { bookSavedType } from './interfaces'

export interface BooksProps {
  books: BookItemType[]
  isActionable?: boolean
}

const Books = ({ books, isActionable = false }: BooksProps) => {
  const [booksSaved, setBooksSaved] = useState<bookSavedType[]>([])

  const loadBookFromLocalStorage = () => {
    const currentBooks = JSON.parse(localStorage.getItem('books') || '[]') || []
    setBooksSaved(currentBooks)
  }

  const handleSaveBook = (id: string, action: string, comment?: string) => {
    const booksSaved = JSON.parse(localStorage.getItem('books') || '[]') || []

    let valueToSave = [...booksSaved]
    const findBook = booksSaved.findIndex((item: bookSavedType) => item.id === id)
    let copyCurrentBook = booksSaved[findBook]
    if (findBook) {
      copyCurrentBook
    }

    switch (action) {
      case 'like':
        if (findBook !== -1) {
          valueToSave.splice(findBook, 1, {
            ...copyCurrentBook,
            isLike: !copyCurrentBook.isLike
          })
          break
        } else {
          valueToSave = [...valueToSave, { id, isLike: true, comments: [] }]
          break
        }
      case 'comment':
        if (findBook !== -1) {
          valueToSave.splice(findBook, 1, {
            ...copyCurrentBook,
            comments: [...copyCurrentBook.comments, comment || '']
          })
          break
        } else {
          valueToSave = [...valueToSave, { id, isLike: false, comments: [comment || ''] }]
          break
        }
    }

    localStorage.setItem('books', JSON.stringify(valueToSave))
    setBooksSaved(valueToSave)
  }

  useEffect(() => {
    if (isActionable) {
      void loadBookFromLocalStorage()
    }
  }, [])

  return (
    <div className="books">
      {books.map(book => (
        <Book
          key={book.id}
          book={book}
          isActionable={isActionable}
          onActionBook={handleSaveBook}
          extraInfo={booksSaved.find((item: bookSavedType) => item.id === book.id)}
        />
      ))}
    </div>
  )
}

export default Books
