import logo from '../../assets/logo/Logo__2.png';
import payment from '../../assets/footer/Payment.png';
import './footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
    <div className="footer-container">
        <div className="footer-column">
            <div className="logo">
                <img src={logo} alt="TrendyCart Logo" />
            </div>
            <p className="description">
                TrendyCart is your one-stop shop for the latest in men's, women's, and kids' fashion. Discover a wide range of trendy clothing and accessories, tailored to suit every style.
            </p>
            <div className="social-media">
                <a href="/" className="social-icon fb"><i className="fa fa-facebook"></i></a>
                <a href="/" className="social-icon insta"><i className="fa fa-instagram"></i></a>
                <a href="/" className="social-icon twitter"><i className="fa fa-twitter"></i></a>
                <a href="/" className="social-icon pin"><i className="fa fa-pinterest"></i></a>
            </div>
        </div>
        <div className="footer-column">
            <h3>Useful Links</h3>
            <ul className="useful-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products/men">Men Fashion</Link></li>
                <li><Link to="/products/accessories">Accessories</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/products/women">Women Fashion</Link></li>
                <li><Link>My Account</Link></li>
                <li><Link>Terms</Link></li>
                <li><Link>Wishlist</Link></li>
            </ul>
        </div>
        <div className="footer-column">
            <h3>Contact Us</h3>
            <div className="contact-item">
                <i className="fa fa-map-marker"></i>
                <span>123 Trendy Street, Fashion City, CA</span>
            </div>
            <div className="contact-item">
                <i className="fa fa-phone"></i>
                <span>+1 234 567 890</span>
            </div>
            <div className="contact-item">
                <i className="fa fa-envelope"></i>
                <span>support@trendycart.com</span>
            </div>
            <div className="payment-methods">
                <img src={payment} alt="Payment Methods" />
            </div>
        </div>
    </div>
    <div className="bottom-footer">
        <p>&copy; 2024 TrendyCart. All Rights Reserved.</p>
    </div>
</footer>
  )
}
