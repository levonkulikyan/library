import React from 'react';
import './footer.css';
import facebook from '../Images/footer/logofb.jpg';
import linkedin from '../Images/footer/logoli.png';
import instagram from '../Images/footer/logoig.jpg';
import youtube from '../Images/footer/logoyt.png';

export default function Footer() {
  return (
    <footer>
      <div className="contact-info">
        <div className="column">
          <h3>Contact Details</h3>
          <p>
            Address:{' '}
            <a
              target="_blank"
              rel="noreferrer" // Added noreferrer here
              className="address-link"
              href="https://www.google.com/maps/dir//Azatutyan+24%2F17+E+Plaza%22+business+center,+Yerevan/@40.2046139,44.5423828,13.45z/data=!4m8!4m7!1m0!1m5!1m1!1s0x406aa3865496bfc1:0x8d2a7e4bb2761525!2m2!1d44.5298105!2d40.2077599?entry=ttu"
            >
              Azatutyan 24/17 E Plaza
            </a>
          </p>
          <p>Phone: +374 43 477447</p>
          <a href="/" target="_blank" rel="noreferrer"><img id="socialLogo" src={facebook} alt="FB" /></a> {/*facebook*/}
          <a href="https://www.linkedin.com/company/picsart-academy/" target="_blank" rel="noreferrer"><img id="socialLogo" src={linkedin} alt="LI" /></a> {/*linkedin*/}
          <a href="https://www.instagram.com/picsart__academy/" target="_blank" rel="noreferrer"><img id="socialLogo" src={instagram} alt="IG" /></a> {/*instagram*/}
          <a href="https://www.youtube.com/@PicsartAcademy" target="_blank" rel="noreferrer"><img id="socialLogo" src={youtube} alt="YT" /></a> {/*youtube*/}
        </div>

        <div className="column">
          <h3>Library Hours</h3>
          <p>Monday - Friday: 9am - 6pm</p>
          <p>Saturday: 10am - 4pm</p>
          <p>Sunday: Closed</p>
        </div>

        <div className="column">
          <h3>Helpful Links</h3>
          <p>
            <a href="https://picsartacademy.am/" target="_blank" rel="noreferrer" className="footer-link">
              Academy Website
            </a>
          </p>
          <p>
            <a href="/" className="footer-link">
              Feedback Form
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
