import React, {useState, useEffect} from 'react'
import BooksContainer from './components/BooksContainer'

const App = () => {
  const [books, setBooks] = useState([])

  console.log('ce message apparaitra à chaque fois que le composant renders')

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

  console.log('the books array in our state : ', books)
  return (
    <>
      <BooksContainer books={books} />
    </>
  )
}

export default App
