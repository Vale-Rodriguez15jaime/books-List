import './book.css'
import { BookItemType } from 'src/services/interfaces'

import { CiHeart } from 'react-icons/ci'
import { FaHeart } from 'react-icons/fa'

import { FaComment } from 'react-icons/fa'
import { bookSavedType } from '@components/Books/interfaces'
import { useEffect, useState } from 'react'

export interface BookProps {
  book: BookItemType
  isActionable: boolean
  onActionBook: (id: string, action: string, comment?: string) => void
  extraInfo?: bookSavedType
}

const Book = ({ book, isActionable, onActionBook, extraInfo }: BookProps) => {
  const [actionsBook, setActionsBook] = useState<bookSavedType | null>(null)

  useEffect(() => {
    if (extraInfo) {
      setActionsBook(extraInfo)
    }
  }, [extraInfo])

  return (
    <div className="container">
      <div className="book">
        <div className="book-image">
          {book.volumeInfo.imageLinks ? (
            <img
              alt={book.volumeInfo.title}
              src={book.volumeInfo.imageLinks.thumbnail || ''}
            />
          ) : (
            <img src="https://picsum.photos/200/260" alt="default" />
          )}
        </div>
        <p className="book-title">{book.volumeInfo.title}</p>
      </div>
      {isActionable && (
        <div className="container-action">
          <button className="heart-button" onClick={() => onActionBook(book.id, 'like')}>
            {actionsBook?.isLike && <FaHeart className="heart-icon red-heart" />}
            {!actionsBook?.isLike && <CiHeart className="heart-icon" />}
          </button>
          <button className="comment-button">
            <FaComment className="comment-icon" />
          </button>
        </div>
      )}
    </div>
  )
}

export default Book
