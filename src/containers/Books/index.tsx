import { useState, useEffect, useMemo, useCallback } from 'react'
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

  const loadBookFromLocalStorage = useCallback(() => {
    const currentBooks = JSON.parse(localStorage.getItem('books') || '[]') || []
    setBooksSaved(currentBooks)
  }, [])

  const handleSaveBook = useCallback((id: string, action: string, comment?: string) => {
    const booksSaved = JSON.parse(localStorage.getItem('books') || '[]') || []

    let valueToSave = [...booksSaved]
    const findBook = booksSaved.findIndex((item: bookSavedType) => item.id === id)
    let copyCurrentBook = booksSaved[findBook]
    if (findBook !== -1) {
      copyCurrentBook = booksSaved[findBook]
    }

    switch (action) {
      case 'like':
        if (findBook !== -1) {
          valueToSave.splice(findBook, 1, {
            ...copyCurrentBook,
            isLike: !copyCurrentBook.isLike
          })
        } else {
          valueToSave = [...valueToSave, { id, isLike: true, comments: [] }]
        }
        break
      case 'comment':
        if (findBook !== -1) {
          valueToSave.splice(findBook, 1, {
            ...copyCurrentBook,
            comments: [...copyCurrentBook.comments, comment || '']
          })
        } else {
          valueToSave = [...valueToSave, { id, isLike: false, comments: [comment || ''] }]
        }
        break
    }

    localStorage.setItem('books', JSON.stringify(valueToSave))
    setBooksSaved(valueToSave)
  }, [])

  useEffect(() => {
    if (isActionable) {
      void loadBookFromLocalStorage()
    }
  }, [])

  const extraInfoMap = useMemo(() => {
    return booksSaved.reduce(
      (acc, book) => {
        acc[book.id] = book
        return acc
      },
      {} as Record<string, bookSavedType>
    )
  }, [booksSaved])

  const memoizedBooks = useMemo(() => {
    return books.map(book => (
      <Book
        key={book.id}
        book={book}
        isActionable={isActionable}
        onActionBook={handleSaveBook}
        extraInfo={extraInfoMap[book.id]}
      />
    ))
  }, [books, isActionable, extraInfoMap, handleSaveBook])

  return <div className="books">{memoizedBooks}</div>
}

export default Books
