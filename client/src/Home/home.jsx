import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Header from '../Header/header';
import Footer from '../Footer/footer';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [visibleItems, setVisibleItems] = useState(getVisibleItems());

  function getVisibleItems() {
    return window.innerWidth < 1000 ? 1 : window.innerWidth < 1300 ? 2 : 4;
  }

  useEffect(() => {
    function handleResize() {
      setVisibleItems(getVisibleItems());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    try {
      fetch('http://localhost:3001/books/allbooks', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((books) => {
          setBooks(books);
        })
        .catch((error) => {
          console.error('Error during API call:', error);
        });
    } catch (error) {
      console.error('Error outside of fetch:', error);
    }
  }, []);

  let book = books.slice(0, 6);
  let last10Books = books.slice(-10, books.length);
  let [start, setStart] = useState(0);
  let [end, setEnd] = useState(visibleItems);

  let handleRightBooks = () => {
    if (end < last10Books.length) {
      setStart(start + 1);
      setEnd(end + 1);
    }
  };

  let handleLeftBooks = () => {
    if (start > 0) {
      setStart(start - 1);
      setEnd(end - 1);
    }
  };


  return (<>
    <Header />

    <div className='body'>
      <div className="main-area">
        <div className="welcome-banner">
          <div className="blur-background"></div>
          <div className="overlay">
            <h1>Welcome To Our Library</h1>
            <h2>Explore our vast collection</h2>
          </div>
        </div>

        <section id="section1" className="featured-books">
          <h2>Featured Books</h2>
          <div className="books-grid">
            {book.map((item, index) => (
              <div key={index} className="book">
                <Link to={`/${item.isbn}`}>
                  <img src={item.cover_url} alt='Img' />
                </Link>
                <div className="book-info">
                  <h3>{item.title}</h3>

                  {item.authors && item.authors.length > 0 ? (
                    <p>{item.authors[0]}</p>
                  ) : (
                    <p>No author information available</p>
                  )}
                  <p>Category: {item.category.join(", ")}</p>
                </div>
              </div>
            ))}

          </div>
          <div className="link-viewAll">
            <a href="/catalog">View All</a>
          </div>
        </section>

        <div className='Recently'>
          <h3 className='h3-carousel'>Recently Added</h3>
          <div className='carousel'>
            <div className='carousel-buttons'>
              <button onClick={handleLeftBooks} id='prev'>
                &lt;
              </button>
            </div>
            <div id='myCarouselRB' className='carousel-container'>
              {last10Books.slice(start, end).map((item) => (
                <div key={item.isbn} className='carouselBook'>
                  <Link to={`/${item.isbn}`}>
                    <img className='carouselImg' src={item.cover_url} alt={`Book ${item.isbn}`} />
                  </Link>
                </div>
              ))}
            </div>
            <div className='carousel-buttons'>
              <button onClick={handleRightBooks} id='next'>
                &gt;
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <Footer />
  </>
  );
}