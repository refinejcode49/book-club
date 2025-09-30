import React, {useEffect, useRef} from 'react'
import {Panel, P, Em, Close, CloseWrapper, BG} from './styles'
import Book from '../Book'

const DetailPanel = ({book, closePanel, state, panelRef}) => {
  const panelEl = useRef(null)
  const prevBook = useRef(null)

  const setPanelRef = (node) => {
    panelEl.current = node
    if (panelRef) {
      panelRef.current = node
    }
  }
  
  useEffect(() => {
    if (prevBook.current !== book) {
      panelEl.current.scrollTop = 0
    }

    prevBook.current = book
  }, [book, prevBook])

  console.log(state)

  return (
    <>
      <BG onClick={closePanel} $state={state} />
      <Panel $state={state} ref={setPanelRef}>
        <CloseWrapper onClick={closePanel} $state={state}>
          <Close />
        </CloseWrapper>

        {book && (
          <>
            <Book book={book} isLarge={true} />
            <P>{book.description}</P>
            <P>
              <Em>Published in {book.published}</Em>
            </P>
          </>
        )}
      </Panel>
    </>
  )
}

export default DetailPanel
