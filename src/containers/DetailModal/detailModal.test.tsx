import { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DetailModal from './index'
import { mockBook } from '@src/constants'

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom')
  return {
    ...original,
    createPortal: jest.fn((element, container) => {
      return element
    })
  }
})

jest.mock('react-icons/io5', () => ({
  IoCloseSharp: () => <span>Close</span>
}))

jest.mock('@components/Modal', () => {
  return {
    __esModule: true,
    default: ({
      children,
      isOpen,
      onClose,
      onSubmit
    }: {
      children: ReactNode
      isOpen: boolean
      onClose: () => void
      onSubmit: () => void
    }) => {
      if (!isOpen) return null
      return (
        <div data-testid="modal-portal">
          <div data-testid="modal">
            <div className="modal-content">
              {children}
              {onSubmit && (
                <button onClick={onSubmit} className="modal-button">
                  Enviar
                </button>
              )}
              <button onClick={onClose} className="modal-close-button">
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )
    }
  }
})

const mockComments: string[] = ['Esto es un comentario malo', 'Esto es un comentario bueno']

describe('DetailModal Component', () => {
  it('renders info when open modal', async () => {
    render(
      <DetailModal
        book={mockBook}
        isOpen={true}
        onClose={() => {}}
        comments={mockComments}
      />
    )

    expect(screen.getByTestId('modal')).toBeInTheDocument()
    expect(
      screen.getByText('Harry potter y las reliquias de la muerte')
    ).toBeInTheDocument()
    expect(screen.getByText('las reliquias de la muerte')).toBeInTheDocument()
    expect(screen.getByText('J. K. Rowling')).toBeInTheDocument()
    expect(screen.getByText('publisher')).toBeInTheDocument()
    expect(screen.getByText('2000-01-01')).toBeInTheDocument()
    expect(screen.getByText('500')).toBeInTheDocument()
    expect(screen.getByText('Es una descripcion interesante')).toBeInTheDocument()
    expect(screen.getByText('Fantasia')).toBeInTheDocument()
    expect(screen.getByText('Más información')).toHaveAttribute(
      'href',
      'https://books.google.com.co/books/about/Harry_Potter.html?hl=&id=saPQsgEACAAJ&redir_esc=y'
    )
  })

  it('it doesnt render when closed', () => {
    render(
      <DetailModal
        book={mockBook}
        isOpen={false}
        onClose={() => {}}
        comments={mockComments}
      />
    )

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('renders list comments', () => {
    render(
      <DetailModal
        book={mockBook}
        isOpen={true}
        onClose={() => {}}
        comments={mockComments}
      />
    )

    expect(screen.getByTestId('comments-list')).toBeInTheDocument()
  })

  it('it doesnt render comments when is empty', () => {
    render(<DetailModal book={mockBook} isOpen={true} onClose={() => {}} />)

    expect(screen.queryByTestId('comments-list')).not.toBeInTheDocument()
  })
})
