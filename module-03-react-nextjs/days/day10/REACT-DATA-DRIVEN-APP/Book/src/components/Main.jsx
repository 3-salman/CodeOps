import React from 'react'
import BookCard from './BookCard'
import {AppContext} from '../AppContext';
import {useContext} from 'react';

// function Main({book, displayedBooks, favorites, favoriteSetter, isLoading , clearallfavorites}) {
function Main() {
  const { displayedBooks, favorites, favoriteSetter, loading, clearallfavorites } = useContext(AppContext);
  return (
    <div>
        {displayedBooks[0] === 1 ? (
         <button
          className="clearallbtn"
          onClick={clearallfavorites} 
        >
            clear all
            <img src="https://cdn-icons-png.flaticon.com/128/484/484611.png"/>
          </button>) : " "}

     <main className="main-content">
        {loading ? (
          <div className="loading">Loading books...</div>
        ) : (
          <div className="grid">
            {displayedBooks[1].length === 0 ? (
              <p className="no-results">No books found.</p>
            ) : (
              displayedBooks[1].map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  isFav={favorites.some((fav) => fav.key === book.key)}
                  favoriteSetter={favoriteSetter}
                  displayedtype={displayedBooks[0]}
                />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default Main