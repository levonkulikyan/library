
import React, { useState, useEffect } from 'react';
import Header from '../Header/header';
import { Link } from 'react-router-dom';
import './catalog.css'; // Import your styles

export default function Catalog() {
  const [keyWord, setKeyWord] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [magicNumber, setMagicNumber] = useState(6);
  const [books, setBooks] = useState([]);
  const [mainBook, setMainBook] = useState(books.slice(0, 6));
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/books/allbooks", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((books) => {
        setBooks(books);
        setMainBook(books.slice(0, 6));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setShowSearchBar(window.innerWidth > 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = (e) => {
    setKeyWord(e.target.value);
    setIsFilterActive(e.target.value !== '');

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(setTimeout(() => {
      let filteredArr = books.filter((book) => book.title.toLowerCase().includes(e.target.value.toLowerCase()));
      setMainBook(filteredArr);
    }, 1000));
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleMoreBooks = () => {
    setMagicNumber((prevMagicNumber) => prevMagicNumber + 6);
    if (magicNumber >= books.length) {
      setMagicNumber(books.length);
    }
  };

  useEffect(() => {
    if (books && books.length > 0) {
      setMainBook(books.slice(0, magicNumber));
    }
  }, [magicNumber, books]);

  const filterKey = (e) => {
    setIsFilterActive(e.target.value !== '' && e.target.value !== 'Reset filters');  // Update filter activation status
  
    if (e.target.value === "Reset filters") {
      setMainBook(books.slice(0, 6));
    } else if (e.target.value === "All books") {
      setMagicNumber(books.length - 1);
      setMainBook(books);
    } else {
      let filteredArr = books.filter((book) => book.category.includes(e.target.value));
      setMainBook(filteredArr);
    }
  }
  //-----------------------------------

  return (
    <>

      <Header />
      <div className='mainCatalog'>
      <div className='toggle-search-bar-btn' onClick={toggleSearchBar}>
          {showSearchBar ? (
            // You can use an arrow icon or any other icon
            <span>&#9660;</span>
          ) : (
            <span>&#9654;</span>
          )}
        </div>
        {showSearchBar && (
          
        <div className='search-bar'>
          
          <form className='form'>
            <div>
              <label htmlFor="search" className='label'></label>
              <input
                type="text"
                id="search"
                value={keyWord}
                onChange={handleSearch}
                className='search-input'
                placeholder='Type to search'
              />
            </div>
          </form>
          
          <div className='filters'>
            
            <h4>Filter Options</h4>
            <div><button className="filter" onClick={filterKey} value={"All books"}>All books</button></div>
            <div><button className="filter" onClick={filterKey} value={"Fiction"}>Fiction</button></div>
            <div><button className="filter" onClick={filterKey} value={"Non Fiction"}>Non Fiction</button></div>
            <div><button className="filter" onClick={filterKey} value={"Biography"}>Biography</button></div>
            <div><button className="filter"onClick={filterKey} value={"History"}>History</button></div>
          </div>
          <div className='reset-button'>  <button className='reset-filters' onClick={filterKey} value={"Reset filters"}>Reset filters</button></div>

        </div>
         )}
        <div className='catalog-all-books'>

          <div className='main-books'>

            {mainBook.map((item, index) => (
              <div key={index} className="catalog-book">
                {/* Wrap the image with an anchor tag */}
                {/* href={`/book/${item.id}`} */}
                <Link to={`/${item.isbn}`}>
                  <img src={item.cover_url} alt={`Book ${index + 1}`} />
                </Link>
                <div className="catalog-book-info">
                  <h3>{item.title}</h3>
                  {item.authors && item.authors.length > 0 ? (
                    <p>{item.authors[0]}</p>
                  ) : (
                    <p>No author information available</p>
                  )}
                </div>
              </div>
            ))}
      </div>
          {(!isFilterActive && keyWord === '') && (
          <div className="ViewMore">
            <button onClick={handleMoreBooks}>View More</button>
          </div>
        )}
    
        </div>
      </div>

    </>
  )
}