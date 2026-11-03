import { Link } from "react-router-dom";
import { BRAND, CITY, EMAIL, PHONE, PHONE_LINK, waLink } from "../config";
import { categories } from "../data/catalog";
import logo from "../Images/logo.png";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" aria-label={`${BRAND} home`}>
                <img src={logo} alt={BRAND} />
              </Link>
              <p>Cameras, fire safety, access control and office equipment for homes, shops and businesses.</p>
              <a className="btn btn-wa" href={waLink("Hello, I'd like to ask about your products.")} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={18} /> Chat on WhatsApp
              </a>
            </div>

            <div>
              <h4>Pages</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Products</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4>Popular categories</h4>
              <ul>
                {categories.slice(0, 5).map((c) => (
                  <li key={c.name}>
                    <Link to={`/shop?category=${encodeURIComponent(c.name)}`}>{c.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Talk to us</h4>
              <ul>
                <li><span className="ic"><PhoneIcon size={17} /></span><a href={PHONE_LINK}>{PHONE}</a></li>
                <li><span className="ic"><MailIcon size={17} /></span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
                <li><span className="ic"><PinIcon size={17} /></span><span>{CITY}</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-base">© {new Date().getFullYear()} {BRAND}. All rights reserved.</div>
      </footer>

      <a className="wa-float" href={waLink("Hello, I'd like to ask about your products.")} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <WhatsAppIcon />
      </a>
    </>
  );
}
