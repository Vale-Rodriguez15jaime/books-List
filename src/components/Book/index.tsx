import './book.css'
import { BookItemType } from 'src/services/interfaces'

import { CiHeart } from 'react-icons/ci'
import { FaHeart, FaComment, FaEye } from 'react-icons/fa'

import { bookSavedType } from '@components/Books/interfaces'
import { useEffect, useState } from 'react'
import CommentsModal from '@containers/CommentsModal'
import DetailModal from '@containers/DetailModal'

export interface BookProps {
  book: BookItemType
  isActionable: boolean
  onActionBook: (id: string, action: string, comment?: string) => void
  extraInfo?: bookSavedType
}

const Book = ({ book, isActionable, onActionBook, extraInfo }: BookProps) => {
  const [actionsBook, setActionsBook] = useState<bookSavedType | null>(null)
  const [isOpenModal, setIsOpenModal] = useState<{
    isOpen: boolean
    action: string | null
  }>({ isOpen: false, action: null })

  const handleResetModal = () => {
    setIsOpenModal({ isOpen: false, action: null })
  }

  const handleSubmitComment = (comment: string) => {
    onActionBook(book.id, 'comment', comment)
    handleResetModal()
  }

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
            {actionsBook?.isLike ? (
              <FaHeart className="heart-icon red-heart" />
            ) : (
              <CiHeart className="heart-icon" />
            )}
          </button>
          <button
            className="comment-button"
            onClick={() => setIsOpenModal({ isOpen: true, action: 'comment' })}
          >
            <FaComment
              className={
                actionsBook?.comments && actionsBook?.comments?.length > 0
                  ? 'comment-icon'
                  : 'comment-icon-empty'
              }
            />
            {actionsBook && actionsBook?.comments?.length > 0 && (
              <span className="comment-badge">{actionsBook.comments.length}</span>
            )}
          </button>
          <button
            className="view-button"
            onClick={() => setIsOpenModal({ isOpen: true, action: 'detail' })}
          >
            <FaEye className="view-icon" />
          </button>
        </div>
      )}
      {isOpenModal.isOpen && isOpenModal.action === 'comment' && (
        <CommentsModal
          onClose={() => handleResetModal()}
          isOpen={isOpenModal.isOpen}
          comments={actionsBook?.comments}
          onSubmit={handleSubmitComment}
        />
      )}
      {isOpenModal.isOpen && isOpenModal.action === 'detail' && (
        <DetailModal
          onClose={() => handleResetModal()}
          isOpen={isOpenModal.isOpen}
          book={book}
          comments={actionsBook?.comments}
        />
      )}
    </div>
  )
}

export default Book
