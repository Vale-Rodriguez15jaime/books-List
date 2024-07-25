import Modal from '@components/Modal'
import { FC, useState } from 'react'
import './commentsModal.css'
import CommentsList from '@components/CommentsList'

type CommentsProps = {
  onClose: () => void
  onSubmit: (comment: string) => void
  isOpen: boolean
  comments?: string[]
}

const CommentsModal: FC<CommentsProps> = ({ onClose, isOpen, comments = [], onSubmit }) => {
  const [comment, setComment] = useState<string>('')

  const handleSubmit = () => {
    onSubmit(comment)
  }

  return (
    <Modal onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen}>
      <div data-testid="comments-modal">
        {comments.length > 0 && <CommentsList comments={comments} />}
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Escribe un comentario..."
          className="modal-textarea"
        />
      </div>
    </Modal>
  )
}

export default CommentsModal
