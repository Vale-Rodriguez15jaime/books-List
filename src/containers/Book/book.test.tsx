import { render, screen, fireEvent, act, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import Book, { BookProps } from './index'
import { BookItemType } from 'src/services/interfaces'
import { bookSavedType } from '@containers/Books/interfaces'
import { mockBook } from '@src/constants'

jest.mock('react-icons/ci', () => ({
  CiHeart: () => <span data-testid="ci-heart">IconHeartEmpty</span>
}))
jest.mock('react-icons/fa', () => ({
  FaHeart: () => <span data-testid="fa-heart">IconHeart</span>,
  FaComment: () => <span data-testid="fa-comment">IconComment</span>,
  FaEye: () => <span data-testid="fa-eye">IconView</span>
}))

jest.mock('@containers/CommentsModal', () => ({
  __esModule: true,
  default: ({
    onClose,
    isOpen,
    comments = [],
    onSubmit
  }: {
    onClose: () => void
    isOpen: boolean
    comments?: string[]
    onSubmit: (comment: string) => void
  }) => {
    if (!isOpen) return null
    return (
      <div data-testid="comments-modal">
        <div>
          <button onClick={onClose}>Close</button>
          <button onClick={() => onSubmit('Test comment')}>Submit</button>
        </div>
      </div>
    )
  }
}))

jest.mock('@containers/DetailModal', () => ({
  __esModule: true,
  default: ({
    onClose,
    isOpen,
    book
  }: {
    onClose: () => void
    isOpen: boolean
    book: BookItemType
  }) => {
    if (!isOpen) return null
    return (
      <div data-testid="detail-modal">
        {isOpen && (
          <div>
            <button onClick={onClose}>Close</button>
            <div data-testid="title-book-detail-modal"> {book.volumeInfo.title} </div>
          </div>
        )}
      </div>
    )
  }
}))

const defaultProps: BookProps = {
  book: mockBook,
  isActionable: true,
  onActionBook: jest.fn()
}

describe('Book Component', () => {
  afterEach(cleanup)

  it('renders book title and image', () => {
    render(<Book {...defaultProps} />)
    expect(
      screen.getByText('Harry potter y las reliquias de la muerte')
    ).toBeInTheDocument()
    expect(
      screen.getByAltText('Harry potter y las reliquias de la muerte')
    ).toHaveAttribute(
      'src',
      'https://books.google.com/books/content?id=saPQsgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    )
  })

  it('renders default image when imageLinks are not provided', () => {
    const bookWithoutImage: BookItemType = {
      ...mockBook,
      volumeInfo: { ...mockBook.volumeInfo, imageLinks: undefined }
    }
    render(<Book {...defaultProps} book={bookWithoutImage} />)
    expect(screen.getByAltText('default')).toHaveAttribute(
      'src',
      'https://cdn4.vectorstock.com/i/1000x1000/76/48/photo-not-found-icon-symbol-sign-vector-22437648.jpg'
    )
  })

  it('renders action buttons when isActionable is true', () => {
    render(<Book {...defaultProps} />)
    expect(screen.getByTestId('ci-heart')).toBeInTheDocument()
    expect(screen.getByTestId('fa-comment')).toBeInTheDocument()
    expect(screen.getByTestId('fa-eye')).toBeInTheDocument()
  })

  it('does not render action buttons when isActionable is false', () => {
    render(<Book {...defaultProps} isActionable={false} />)
    expect(screen.queryByTestId('ci-heart')).not.toBeInTheDocument()
    expect(screen.queryByTestId('fa-comment')).not.toBeInTheDocument()
    expect(screen.queryByTestId('fa-eye')).not.toBeInTheDocument()
  })

  it('renders like button when isActionable is true', () => {
    render(<Book {...defaultProps} />)
    const likeButton = screen.getByTestId('like-button-book')
    fireEvent.click(likeButton)
    expect(likeButton).toBeInTheDocument()
    expect(defaultProps.onActionBook).toHaveBeenCalledWith('1', 'like')
  })

  it('opens comment modal when click in button comments', async () => {
    await act(async () => {
      render(<Book {...defaultProps} />)
    })

    const commentButton = screen.getByTestId('comment-button-book')
    expect(commentButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(commentButton)
    })

    await waitFor(() => {
      expect(screen.getByTestId('comments-modal')).toBeInTheDocument()
    })

    expect(screen.getByText('Close')).toBeInTheDocument()
  })

  it('opens detail modal when view button is clicked', async () => {
    await act(async () => {
      render(<Book {...defaultProps} />)
    })

    const viewComment = screen.getByTestId('view-button-book')
    expect(viewComment).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(viewComment)
    })

    await waitFor(() => {
      expect(screen.getByTestId('detail-modal')).toBeInTheDocument()
      expect(screen.getByTestId('title-book-detail-modal')).toBeInTheDocument()
    })
  })

  it('renders IconHeart when book is liked', () => {
    const extraInfo: bookSavedType = { isLike: true, comments: [], id: '1' }
    render(<Book {...defaultProps} extraInfo={extraInfo} />)
    expect(screen.getByTestId('fa-heart')).toBeInTheDocument()
  })

  it('displays comment count when comments exist', () => {
    const extraInfo: bookSavedType = {
      isLike: false,
      comments: ['Esto es un comentario regular', 'Esto es otro comentario interesante'],
      id: '1'
    }
    render(<Book {...defaultProps} extraInfo={extraInfo} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
