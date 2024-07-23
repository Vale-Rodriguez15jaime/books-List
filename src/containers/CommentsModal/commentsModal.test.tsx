import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import CommentsModal from './index'

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  return {
    ...original,
    createPortal: jest.fn((element, container) => {
      return element;
    }),
  };
});


jest.mock('react-icons/io5', () => ({
  IoCloseSharp: () => <span>Close</span>,
}));

jest.mock('@components/Modal', () => {
  return {
    __esModule: true,
    default: ({ children, isOpen, onClose, onSubmit }: {
      children: React.ReactNode;
      isOpen: boolean;
      onClose: () => void;
      onSubmit: () => void;
    }) => 
      isOpen ? (
        <div data-testid="modal">
          <div className="modal-content">
            {children}
            <button onClick={onSubmit} className="modal-button">Enviar</button>
            <button onClick={onClose} className="modal-close-button">
              <span>Close</span>
            </button>
          </div>
        </div>
      ) : null
  }
});

describe('CommentsModal', () => {
  const mockOnClose = jest.fn()
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('when isOpen is false', () => {
    render(<CommentsModal onClose={mockOnClose} onSubmit={mockOnSubmit} isOpen={false} />)
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  test('renders modal when isOpen is true', () => {
    render(<CommentsModal onClose={mockOnClose} onSubmit={mockOnSubmit} isOpen={true} />)
    expect(screen.getByTestId('modal')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Escribe un comentario...')).toBeInTheDocument()
  })

  test('renders list comments', () => {
    const comments = ['El libro de harry potter es bueno', 'El libro de harry potter es medio bueno']
    render(
      <CommentsModal
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        isOpen={true}
        comments={comments}
      />
    )
    expect(screen.getByText('Lista de comentarios')).toBeInTheDocument()
    comments.forEach(comment => {
      expect(screen.getByText(comment)).toBeInTheDocument()
    })
  })

  test('does not render comments when list comments is empty', () => {
    render(<CommentsModal onClose={mockOnClose} onSubmit={mockOnSubmit} isOpen={true} />)
    expect(screen.queryByText('Lista de comentarios')).not.toBeInTheDocument()
  })

  test('updates input value', () => {
    render(<CommentsModal onClose={mockOnClose} onSubmit={mockOnSubmit} isOpen={true} />)
    const textarea = screen.getByPlaceholderText('Escribe un comentario...') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'El libro de harry potter es bueno' } })
    expect(textarea.value).toBe('El libro de harry potter es bueno')
  })

  test('calls onSubmit when submit button is clicked', () => {
    render(<CommentsModal onClose={mockOnClose} onSubmit={mockOnSubmit} isOpen={true} />)
    const textarea = screen.getByPlaceholderText('Escribe un comentario...') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'El libro de harry potter es medio bueno' } })
    fireEvent.click(screen.getByText('Enviar'))
    expect(mockOnSubmit).toHaveBeenCalledWith('El libro de harry potter es medio bueno')
  })

  test('calls onClose when close button is clicked', () => {
    render(<CommentsModal onClose={mockOnClose} onSubmit={mockOnSubmit} isOpen={true} />)
    fireEvent.click(screen.getByText('Close'))
    expect(mockOnClose).toHaveBeenCalled()
  })
})
