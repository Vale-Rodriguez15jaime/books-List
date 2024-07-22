import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WrapperPageBooks from './index';
import '@testing-library/jest-dom';
import { useGetListBooks } from '@hooks/useGetListBooks';

jest.mock('@hooks/useGetListBooks', () => ({
  useGetListBooks: jest.fn(),
}));

const book = {
  id: 'SqikDwAAQBAJ',
  volumeInfo: {
    title: 'JavaScript - Aprende a programar en el lenguaje de la web',
    authors: ['Fernando Luna'],
    publishedDate: '2019-07-23',
    imageLinks: {
      smallThumbnail:
        'http://books.google.com/books/content?id=SqikDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      thumbnail:
        'http://books.google.com/books/content?id=SqikDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    }
  }
};

test('renders Books when data is loaded', () => {
  (useGetListBooks as jest.Mock).mockReturnValue({
    isLoading: false,
    data: { data: { items: [book] } },
    refetch: jest.fn(),
  });

  render(<WrapperPageBooks />);
  expect(screen.getByText(/JavaScript - Aprende a programar en el lenguaje de la web/i)).toBeInTheDocument();
});

test('calls refetch when search value changes', async () => {
  const refetchMock = jest.fn();

  (useGetListBooks as jest.Mock).mockReturnValue({
    isLoading: false,
    data: { data: { items: [] } },
    refetch: refetchMock,
  });

  render(<WrapperPageBooks />);

  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Harry' } });

  await waitFor(() => {
    expect(refetchMock).toHaveBeenCalled();
  });
});