import React from 'react'
import Book from '../Book'
import './books.css'
import { BookItemType } from 'src/services/interfaces'

export interface BooksProps {
  books: BookItemType[]
}

const Books = ({ books }: BooksProps) => {
  return (
    <div className="books">
      {books.map(book => <Book key={book.id} book={book} />)} 
    </div>
  )
}

export default Books
