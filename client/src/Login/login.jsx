import React, { useState } from 'react';
import './l.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/auth';
import { useNavigate } from 'react-router-dom';
import logo from "../Images/header/2.png"
import background from "../Images/featured/background2.jpg"

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Add state for error
    const { user, login } = useAuth();
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(null); // Clear error when email changes
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError(null); // Clear error when password changes
    };

    const handleLogin = async () => {
        try {
            await login({ email, password });
            navigate('/');
        } catch (error) {
            alert("asd")

            if (error.message === 'User not found' ) {
                alert("er")
            }
            else if(error.message === 'Incorrect password'){
                alert('asdf')
            }
            
            else {
                // Handle other errors as needed
                console.error('An error occurred during authentication:', error);
            }
        }
    };

    const handleForgetPassword = () => {
        console.log('Forget Password clicked');
    };


    return (
        <>
            <div className="header">
                <div className="logo">
                    <Link to="/" >
                        <img src={logo} alt="logo" className="logo" />
                    </Link>
                </div>
                <nav className="log-nav">
                    <ul>
                        <li><Link to="/" className="log-nav-link">	&lArr;Home</Link></li>
                    </ul>

                </nav>
            </div>
            <div>
                <img src={background} alt="background-img" className='background-img' />
                <div className='form-container' id="loginForm">
                    <form className="login-form">
                        <h1 className="title">Login</h1>
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={handleEmailChange}
                            className='input'
                            placeholder="Email or phone number"
                            required
                        />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className='input'
                            placeholder="Password"
                            required
                        />
                        <button type="button" onClick={handleLogin} className='login-button'>
                            Submit
                        </button>
                        {error && <p className="error-message">{error}</p>}
                        <div className="links">
                            <a href="/" id="forgot-password-link" onChange={handleForgetPassword} >Forgot Password?</a>
                            <Link to="/Signup">Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default LoginPage;