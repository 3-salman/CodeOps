import React from 'react';

function BookCard({ book, isFav, favoriteSetter, displayedtype }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/150x200?text=No+Cover';

  return (
    <div className="card">
      <img src={coverUrl} alt={book.title} className="card-img" />
      <div className="card-body">
        <h3>{book.title}</h3>
        <p><strong>Author:</strong> {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
        <p><strong>First Published:</strong> {book.first_publish_year || 'N/A'}</p>
        <button
          className={`fav-btn ${isFav ? 'active' : ''}`}
          onClick={() => favoriteSetter(book)}
        >
          {isFav ? displayedtype == 1 ? 'Remove' : 'Saved to Favorites' : 'Add to Favorites'} 

          
        </button>
      </div>
    </div>
  );
}

export default BookCard;