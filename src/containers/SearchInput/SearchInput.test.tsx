import { render, fireEvent, screen } from '@testing-library/react'
import SearchInput from '.'

import '@testing-library/jest-dom'

test('renders differents texts in the component', () => {
  render(<SearchInput onCaptureSearchValue={() => {}} />);
  
  expect(screen.getByText(/GOOGLE BOOKS/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Buscar un libro/i)).toBeInTheDocument();
  expect(screen.getByText(/Buscar/i)).toBeInTheDocument();
});

test('input value', () => {
  render(<SearchInput onCaptureSearchValue={() => {}} />);
  
  const input = screen.getByPlaceholderText(/Buscar un libro/i);
  fireEvent.change(input, { target: { value: 'Harry' } });
  expect(input).toHaveValue('Harry');
});

test('calls onCaptureSearchValue when button is clicked', () => {
  const mockCaptureSearchValue = jest.fn();
  render(<SearchInput onCaptureSearchValue={mockCaptureSearchValue} />);
  
  fireEvent.change(screen.getByPlaceholderText(/Buscar un libro/i), { target: { value: 'Harry' } });
  fireEvent.click(screen.getByText(/Buscar/i));
  expect(mockCaptureSearchValue).toHaveBeenCalledWith('Harry');
});

test('calls onCaptureSearchValue when Enter key is pressed', () => {
  const mockCaptureSearchValue = jest.fn();
  render(<SearchInput onCaptureSearchValue={mockCaptureSearchValue} />);

  fireEvent.change(screen.getByPlaceholderText(/Buscar un libro/i), { target: { value: 'Harry' } });
  fireEvent.keyDown(screen.getByPlaceholderText(/Buscar un libro/i), { key: 'Enter', code: 'Enter', charCode: 13 });
  expect(mockCaptureSearchValue).toHaveBeenCalledWith('Harry');
});
