import React from 'react'
import {render, waitFor, fireEvent, screen} from '@testing-library/react'
import axiosMock from 'axios'
import SearchInput from '.'

const book = {
  id: 'SqikDwAAQBAJ',
  volumeInfo: {
    title: 'JavaScript - Aprende a programar en el lenguaje de la web',
    authors: ["Fernando Luna"],
    publishedDate: "2019-07-23",
    imageLinks: {
      "smallThumbnail": "http://books.google.com/books/content?id=SqikDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      "thumbnail": "http://books.google.com/books/content?id=SqikDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
  }
}

test('SearchInput: Should get books when SearchInput is mounted' ,async () => {
  const setResponse = jest.fn()
  const books = {items: [book]}
  const response = {data: books}
  // axiosMock.get.mockResolvedValue(response)

  render(<SearchInput setResponse={setResponse} />)
  await waitFor(() => {
    expect(setResponse).toBeCalledWith(response)
  })

})


test('SearchInput: Should get books when click on Buscar', async () => {
  const setResponse = jest.fn()
  const books = {items: [book]}
  const response = {data: books}
  // axiosMock.get.mockResolvedValue(response)

  render(<SearchInput setResponse={setResponse} />)
  await waitFor(() => {
    expect(setResponse).toBeCalledWith(response)
  })

  fireEvent.change(screen.getByPlaceholderText(/Buscar/i),
    { target: { value: 'javascript' } }
  )

  fireEvent.click(screen.getByText('Buscar'))

  await waitFor(() => {
    expect(setResponse).toBeCalledTimes(2)
  })

})
