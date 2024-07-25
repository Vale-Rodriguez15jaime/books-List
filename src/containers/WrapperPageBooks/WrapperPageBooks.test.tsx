import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import WrapperPageBooks from './index'
import { useGetListBooks } from '@hooks/useGetListBooks'
import { mockBook } from '@src/constants'

jest.mock('@hooks/useGetListBooks', () => ({
  useGetListBooks: jest.fn()
}))

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

test('renders Books when data is loaded', () => {
  ;(useGetListBooks as jest.Mock).mockReturnValue({
    isLoading: false,
    data: { data: { items: [mockBook] } },
    refetch: jest.fn()
  })

  renderWithRouter(<WrapperPageBooks />)
  expect(screen.getByText(/Harry potter y las reliquias de la muerte/i)).toBeInTheDocument()
})

test('calls refetch when search value changes', async () => {
  const refetchMock = jest.fn()

  ;(useGetListBooks as jest.Mock).mockReturnValue({
    isLoading: false,
    data: { data: { items: [] } },
    refetch: refetchMock
  })

  renderWithRouter(<WrapperPageBooks />)

  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Harry' } })

  await waitFor(() => {
    expect(refetchMock).toHaveBeenCalled()
  })
})
