import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './bookdetails.css'
import image from "../Images/books/1.jpg"

// import Header from '../Header/header';
// import Footer from '../Footer/footer';

export default function Bookdetails() {
  const { isbn } = useParams();
  const [book, setBook] = useState({})
  useEffect(() => {
    fetch("http://localhost:3001/books/isbn", {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "isbn": isbn }),
    })
      .then((response) => {
        return response.json()
      })
      .then((book) => {
        setBook(book);
      }).catch((e) => {
        console.log(e)
      })
  }, [isbn]);

  return (
    <>
      <div className='main-details'>
      <div className="close-button">
  <button onClick={() => {
    window.history.back();
  }}>
    <span>&#215;</span>
  </button>
</div>
        <div className='bookDetail'>
          <div className='description'>
            <div className='bookImage'>
              <img src={book.cover_url} alt="img" className="image" />
            </div>
            <div className="text-details">
              <h1 className="description-h1">{book.title}</h1>
              <h3 className="description-h3">{book.authors && book.authors.join(', ')}</h3>
              <h4 className="description-h4">{book.category && book.category.join(', ')}</h4>
              <p className="description-p">descriptionAs she unearths the artifact's cryptic past,
                Elara discovers connections to her own lineage and a destiny intricately tied to the fate of civilizations long lost.
                From the vibrant streets of modern-day metropolises to the hushed whispers of ancient ruins, "Echoes of Eternity"
                embarks on an odyssey through time, exploring the profound impact of choices made and the enduring power of human resilience.</p>
              <div className='catalog-btn-section'>
                <button className='borrow-reserve-button'>Borrow</button>
                <button className='borrow-reserve-button'>Reserve</button>
              </div>
            </div>
          </div>
        </div>

        <h1 className='related-books'>Related Books</h1>

        <div class="rb-carousel">
          <div class="rb-carousel-buttons">
            <button id="prev">&lt;</button>
          </div>
          <div id="myCarousel" className="rb-carousel-container">
            <div class="rbcarouselBook">
              <img className="rbcarouselImg" src={image} alt="Item 1" />
            </div>
            <div class="rbcarouselBook">
              <img className="rbcarouselImg" src={image} alt="Item 1" />
            </div>
            <div class="rbcarouselBook">
              <img className="rbcarouselImg" src={image} alt="Item 1" />
            </div>
            <div class="rbcarouselBook">
              <img className="rbcarouselImg" src={image} alt="Item 1" />
            </div>
          </div>
          <div class="rb-carousel-buttons">
            <button id="next">&gt;</button>
          </div>
        </div>
      </div>
    </>
  )

}