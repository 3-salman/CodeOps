import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import {AppContext} from './AppContext';
import './App.css';
import Main from './components/Main';







function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('all');
  const [category, setCategory] = useState('all');
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [favcategory, setFav_category] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${query}&limit=20`
        );
        const data = await response.json();
        setBooks(data.docs || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  // function handleCategoryChangeforfavorite(e){
  //   // const selectedCategory = e.target.value;
  //   const selectedCategory = favorites.map((book) => book.sub);
  //   setFav_category(e.target.value);
  //   favorites
    
  // };
  function clearallfavorites(){
    setFavorites([]);
    localStorage.removeItem("favorites");
  }

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setQuery(selectedCategory);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setQuery(query);
    }
  };

  const Favorite_setter = (book) => {
    const isFav = favorites.some((fav) => fav.key === book.key);
    if (isFav) {
      setFavorites(favorites.filter((fav) => fav.key !== book.key));
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      setFavorites([...favorites, book]);
      localStorage.setItem("favorites", JSON.stringify([...favorites, book]));
    }
  };

  const displayedBooks = showFavoritesOnly ? [1,favorites ]: [0,books];

  return (
    <div className="container">
      <AppContext.Provider value={{ query, setQuery,category ,handleCategoryChange,handleSearchSubmit,showFavoritesOnly ,setShowFavoritesOnly ,displayedBooks,favorites, setFavorites,
            books, setBooks, loading, setLoading, favcategory, setFav_category, clearallfavorites, Favorite_setter }}>
       
      <Navbar/>

     <Main/>
     </AppContext.Provider>
     
    </div>
  );
}

export default App;