import Modal from '@components/Modal'
import { FC, useState } from 'react'
import './commentsModal.css'

type CommentsProps = {
  onClose: () => void
  onSubmit: (comment: string) => void
  isOpen: boolean
  comments?: string[]
}

const CommentsModal: FC<CommentsProps> = ({ onClose, isOpen, comments = [], onSubmit }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    onSubmit(comment)
  }

  return (
    <Modal onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen}>
      {comments.length > 0 && (
        <div>
          <span className="comments-title">Lista de comentarios</span>
          <div className="comments-list">
            {comments?.map((item: string, index: number) => (
              <div className="item-comment" key={index}>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Escribe un comentario..."
        className="modal-textarea"
      />
    </Modal>
  )
}

export default CommentsModal
