
import React, { useEffect } from 'react';
import "./header.css"
import logo from "../Images/header/2.png"
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useAuth } from '../Context/auth';
import { useNavigate } from 'react-router-dom';
;

export default function Header() {
  useEffect(() => {
    const header = document.getElementById('site-header');
    const handleMouseAndScroll = (e) => {
      const isMouseNearTop = e.clientY < 100; /* Adjust the value as needed */
      const scrollTop = window.scrollY || window.pageYOffset;
      const isAtTopOfPage = scrollTop === 0;

      if (isMouseNearTop || isAtTopOfPage) {
        header.classList.remove('header-hidden'); /* Show header when near the top or at the top */
      } else {
        header.classList.add('header-hidden'); /* Hide header when away from the top */
      }
    };

    document.addEventListener('mousemove', handleMouseAndScroll);
    document.addEventListener('scroll', handleMouseAndScroll);

    return () => {
      document.removeEventListener('mousemove', handleMouseAndScroll);
      document.removeEventListener('scroll', handleMouseAndScroll);
    };
  }, []); 



  const { user, logout } = useAuth();
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Error during authentication:', error);
    }
    console.log('Logged out');
  };

  return (
    <header id="site-header" className="header-hidden">
        <div className="logo">
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>
        <nav id="site-nav">
        <ul>
          {user ? (
            <li><Link to="/" className="nav-link">{JSON.stringify(user.name).slice(1, -1)}</Link></li>
          ) : (
            <li><Link to="/login" className="nav-link">Login</Link></li>
          )}
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/catalog" className="nav-link">Catalog</Link></li>
          {user ? (
            <li><button className="logOut-btn" onClick={handleLogout}>Logout</button></li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}
