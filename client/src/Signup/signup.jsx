import { useState } from "react";
import "./s.css";
import { Link } from "react-router-dom";
import { useAuth } from '../Context/auth';
import { useNavigate } from 'react-router-dom';
import background from "../Images/featured/background2.jpg"

export default function Register() {
  const [name, setName] = useState("");
  const [surename, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [wave, setWave] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user, register } = useAuth();
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleSurname = (e) => {
    setSurname(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleMobile = (e) => {
    setMobile(e.target.value)
  }

  const handleWave = (e) => {
    setWave(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleRegister = async () => {
    try {
      await register({ name, surename, email, mobile, wave, password });
      console.log('Successful registration with email:', email);
      navigate('/login');
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <>
      <div><img src={background} alt="background-img" className='background-img' />
        <div className="container">

          <form className="signup-form">

          <h1 className="title">SignUp</h1>

            <div className="input-pair">
              <div className="input-box">
                <span className="details">First Name</span>
                <input
                  placeholder="Enter your first name"
                  type="text"
                  value={name}
                  onChange={handleName}
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Last Name</span>
                <input
                  placeholder="Enter your last name"
                  type="text"
                  value={surename}
                  onChange={handleSurname}
                  required />
              </div>
            </div>

            <div class="input-pair">
              <div class="input-box">
                <span class="details">Email</span>
                <input
                  placeholder="enter the email"
                  type="email"
                  value={email}
                  onChange={handleEmail}
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Mobile number</span>
                <input
                  placeholder="  enter your mobile number"
                  type="number"
                  value={mobile}
                  onChange={handleMobile}
                  required />
              </div>
            </div>

          


            <div class="input-pair">
              <div class="input-box">
                <span class="details">Create Password</span>
                <input
                  placeholder="  enter a password, at least 8 digits"
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Repeat Password</span>
                <input
                  placeholder="  repeat the entered password to confirm it"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  required />
              </div>
            </div>

            <span class="details">Choose the Wave</span>
            <select
              name="Waves"
              className="registrationSelect"
              value={wave}
              onChange={handleWave}
            >
              <option value="Wave 6">Wave 6</option>
              <option value="Wave 5">Wave 5</option>
              <option value="Wave 4">Wave 4</option>
              <option value="Wave 3">Wave 3</option>
              <option value="Wave 2">Wave 2</option>
              <option value="Wave 1">Wave 1</option>
              <option value="Atlas">Atlas</option>
            </select>

            <input type="submit" value="Submit" className="registrationSubmit" onClick={handleRegister} />
            <Link to="/login" className="toLogin">
             Do you already have an account?
            </Link>
          </form>

        </div>


      </div>
    </>
  );
}