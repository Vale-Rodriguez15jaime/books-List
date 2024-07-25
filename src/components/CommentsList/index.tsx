import { FC } from 'react'
import './commentsList.css'

const CommentsList: FC<{ comments?: string[] }> = ({ comments }) => {
  return (
    <div data-testid="comments-list">
      <span className="comments-title">Lista de comentarios</span>
      <div className="comments-list">
        {comments?.map((item: string, index: number) => (
          <div className="item-comment" key={index}>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentsList
