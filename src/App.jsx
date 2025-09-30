import React, {useState, useEffect, useRef} from 'react'
import BooksContainer from './components/BooksContainer'
import Header from './components/Header'
import DetailPanel from './components/DetailsPanel'
import {GlobalStyle} from './styles'
import {Transition} from 'react-transition-group'
import Search from './components/Search'

const App = () => {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [showPanel, setShowPanel] = useState(false)

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
    setShowPanel(true)
  }

  const closePanel = () => {
    setShowPanel(false)
  }

  const filterBooks = (searchTerm) => {
    if (!searchTerm) {
      return books
    } else {
      return books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
  }

  const panelRef = useRef(null)
  //console.log(selectedBook)
  //console.log('the books array in our state : ', books)
  return (
    <>
      <GlobalStyle />
      <Header>
        <Search />
      </Header>
      <BooksContainer books={books} pickBook={pickBook} isPanelOpen={showPanel} />
      <Transition in={showPanel} timeout={300} nodeRef={panelRef}>
        {(state) => (
          <DetailPanel book={selectedBook} closePanel={closePanel} state={state} panel={panelRef} />
        )}
      </Transition>
    </>
  )
}

export default App
