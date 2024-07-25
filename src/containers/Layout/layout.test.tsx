import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './index'

const mockNavigate = jest.fn()

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => ({
    pathname: '/'
  })
}))

describe('Layout component', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  test('renders correctly', () => {
    render(
      <BrowserRouter>
        <Layout>Libros</Layout>
      </BrowserRouter>
    )
    const homeButton = screen.getByText('Home')
    const bookstoreButton = screen.getByText('Bookstore')

    expect(homeButton).toBeInTheDocument()
    expect(bookstoreButton).toBeInTheDocument()
    expect(homeButton).toHaveClass('button-selected')
    expect(bookstoreButton).not.toHaveClass('button-selected')
  })

  test('navigates to the correct path on button click', () => {
    render(
      <BrowserRouter>
        <Layout>Libros</Layout>
      </BrowserRouter>
    )
    fireEvent.click(screen.getByText('Bookstore'))
  })

  test('navigates to the home path on button click', () => {
    render(
      <BrowserRouter>
        <Layout>Libros</Layout>
      </BrowserRouter>
    )
    fireEvent.click(screen.getByText('Home'))
  })
})
