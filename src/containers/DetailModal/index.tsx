import Modal from '@components/Modal'
import { BookItemType } from '@src/services/interfaces'
import { FC } from 'react'
import './detailModal.css'
import CommentsList from '@components/CommentsList'

type DetailModalProps = {
  onClose: () => void
  isOpen: boolean
  book: BookItemType
  comments?: string[]
}

const DetailModal: FC<DetailModalProps> = ({ book, onClose, isOpen, comments = [] }) => {
  const { volumeInfo } = book

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="book-details">
        <div className="book-content">
          <div className="book-info">
            {volumeInfo.categories?.[0] && (
              <div className="container-category">
                <div>Categoria: </div>
                <div className="book-category">{volumeInfo.categories?.[0]}</div>
              </div>
            )}
            <h1 className="book-title letter-blue">{volumeInfo.title}</h1>
            {volumeInfo.subtitle && <p className="book-subtitle">{volumeInfo.subtitle}</p>}
            <p className="book-authors">{volumeInfo.authors?.join(', ') || ''}</p>
            <div className="book-details-row">
              <span className="detail-label">Publicado por:</span>
              <span className="detail-value letter-blue">
                {volumeInfo.publisher || 'Desconocido'}
              </span>
            </div>
            <div className="book-details-row">
              <span className="detail-label">Fecha de publicación:</span>
              <span className="detail-value letter-blue">
                {volumeInfo.publishedDate || 'Desconocida'}
              </span>
            </div>
            <div className="book-details-row">
              <span className="detail-label">Páginas:</span>
              <span className="detail-value letter-blue">
                {volumeInfo.pageCount || 'Desconocido'}
              </span>
            </div>
            <p className="book-description">
              {volumeInfo.description || 'Sin descripción disponible.'}
            </p>
            <div>
              {comments && comments.length > 0 && <CommentsList comments={comments} />}
            </div>

            {volumeInfo.canonicalVolumeLink && (
              <a
                href={volumeInfo.canonicalVolumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="more-info-button"
              >
                Más información
              </a>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DetailModal
