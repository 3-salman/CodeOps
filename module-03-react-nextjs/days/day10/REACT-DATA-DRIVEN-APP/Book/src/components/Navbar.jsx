import React from 'react';
import {AppContext} from '../AppContext';
import {useContext} from 'react';


function Navbar()
{

      const { query, setQuery, category, handleCategoryChange, handleSearchSubmit, showFavoritesOnly, setShowFavoritesOnly, displayedBooks, favorites } = useContext(AppContext);




  return (

    <header className="navbar">

      <div className="nav-top">
        <h1>📚 Book Explorer</h1>
        <button 
          className="fav-toggle-btn"
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          {showFavoritesOnly ? 'Show All Books' : `Favorites (${favorites.length})`}
        </button>
        
      </div>

      {displayedBooks[0] === 0 ? (

        <div className="controls">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="filter-group">
            <label htmlFor="category">Category: </label>
            <select id="category" value={category} onChange={handleCategoryChange} > {/*displayedBooks[0] === 1 ? handleCforf : handleCategoryChange}> */}
              <option value="all">All</option>
              <option value="programming">Programming</option>
              <option value="science">Science</option>
              <option value="fiction">Fiction</option>
              <option value="history">History</option>
            </select>
          </div>

        </div>): " "}
    </header>
  );
}

export default Navbar;