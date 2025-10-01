import React, {useState, useEffect, useRef} from 'react'
import BooksContainer from './components/BooksContainer'
import Header from './components/Header'
import DetailPanel from './components/DetailsPanel'
import Search from './components/Search'
import {GlobalStyle} from './styles'
import {Transition} from 'react-transition-group'

const App = () => {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [showPanel, setShowPanel] = useState(false)
  const [filteredBooks, setFilteredBooks] = useState([])

  //console.log('ce message apparaitra à chaque fois que le composant renders')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://book-club-json.herokuapp.com/books')
        console.log('here is the response : ', response)

        const books = await response.json()
        console.log('our json-ified response: ', books)
        setBooks(books)
        setFilteredBooks(books)
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
    const stringSearch = (bookAttribute, searchTerm) =>
      bookAttribute.toLowerCase().includes(searchTerm.toLowerCase())

    if (!searchTerm) {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(
        books.filter(
          (book) => stringSearch(book.title, searchTerm) || stringSearch(book.author, searchTerm),
        ),
      )
    }
  }

  const hasFiltered = filteredBooks.length !== books.length

  const panelRef = useRef(null)
  //console.log(selectedBook)
  //console.log('the books array in our state : ', books)
  return (
    <>
      <GlobalStyle />
      <Header>
        <Search filterBooks={filterBooks} />
      </Header>
      <BooksContainer
        books={filteredBooks}
        pickBook={pickBook}
        isPanelOpen={showPanel}
        title={hasFiltered ? 'Search results' : 'All books'}
      />
      <Transition in={showPanel} timeout={300} nodeRef={panelRef}>
        {(state) => (
          <DetailPanel book={selectedBook} closePanel={closePanel} state={state} panel={panelRef} />
        )}
      </Transition>
    </>
  )
}

export default App
