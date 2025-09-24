import React, {useState, useEffect} from 'react'
import BooksContainer from './components/BooksContainer'
import Header from './components/Header'
import DetailPanel from './components/DetailsPanel'
import {GlobalStyle} from './styles'

const App = () => {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)

  //console.log('ce message apparaitra à chaque fois que le composant renders')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://book-club-json.herokuapp.com/books')
        console.log('here is the response : ', response)

        const books = await response.json()
        console.log('our json-ified response: ', books)
        setBooks(books)
      } catch (errors) {
        console.log(errors)
      }
    }

    fetchData()
  }, [])

  const pickBook = (book) => {
    setSelectedBook(book)
  }

  const closePanel = () => {
    setSelectedBook(null)
  }
  //console.log(selectedBook)
  //console.log('the books array in our state : ', books)
  return (
    <>
      <GlobalStyle />
      <Header />
      <BooksContainer books={books} pickBook={pickBook} isPanelOpen={selectedBook !== null} />
      {selectedBook && <DetailPanel book={selectedBook} closePanel={closePanel} />}
    </>
  )
}

export default App
