import { BookItemType } from '@src/services/interfaces'

export const mockBook: BookItemType = {
  id: '1',
  volumeInfo: {
    title: 'Harry potter y las reliquias de la muerte',
    subtitle: 'las reliquias de la muerte',
    authors: ['J. K. Rowling'],
    publisher: 'publisher',
    publishedDate: '2000-01-01',
    description: 'Es una descripcion interesante',
    pageCount: 500,
    categories: ['Fantasia'],
    canonicalVolumeLink:
      'https://books.google.com.co/books/about/Harry_Potter.html?hl=&id=saPQsgEACAAJ&redir_esc=y',
    imageLinks: {
      thumbnail:
        'https://books.google.com/books/content?id=saPQsgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    }
  }
}

export const mockTwoBooks: BookItemType[] = [mockBook, {
    id: '1',
    volumeInfo: {
      title: 'Harry potter y la piedra filosofa',
      subtitle: 'Piedrita',
      authors: ['J. K. Rowling'],
      publisher: 'publisher',
      publishedDate: '1995-01-01',
      description: 'Es una descripcion interesante sobre la piedra',
      pageCount: 500,
      categories: ['Fantasia'],
      canonicalVolumeLink:
        'https://books.google.com.co/books/about/Harry_Potter.html?hl=&id=saPQsgEACAAJ&redir_esc=y',
      imageLinks: {
        thumbnail:
          'https://books.google.com/books/content?id=saPQsgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
      }
    }
  }]
