import { useState } from 'react';
import { Link } from 'react-router-dom';
import { collections } from '../data/products';
import Button from './Button';

const COMPANY_LINKS = [
  { to: '/about', label: 'About Otium' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

const ACCOUNT_LINKS = [
  { to: '/account', label: 'Account' },
  { to: '/account/orders', label: 'Orders' },
  { to: '/wishlist', label: 'Wishlist' },
];

// External profiles are placeholders until the brand accounts exist.
const SOCIAL_LINKS = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://pinterest.com', label: 'Pinterest' },
  { href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Mock signup: no backend in this phase, so we just confirm locally.
  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <span className="footer__logo">OTIUM</span>
            <p className="footer__note">
              Objects for a considered day. Made in small batches, shipped
              without hurry.
            </p>
            <span className="eyebrow" id="newsletter-label">
              The Slow Letter
            </span>
            <p className="footer__note">
              One email a month — what we&rsquo;re making, and nothing that
              needs answering before Tuesday.
            </p>
            {subscribed ? (
              <p className="footer__note" role="status">
                You&rsquo;re on the list. The next letter arrives at the start
                of the month.
              </p>
            ) : (
              <form
                className="footer__newsletter"
                onSubmit={handleSubscribe}
                aria-labelledby="newsletter-label"
              >
                <input
                  type="email"
                  className="input"
                  placeholder="Email address"
                  aria-label="Email address for newsletter"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Button type="submit" variant="secondary">
                  Join
                </Button>
              </form>
            )}
          </div>

          <nav className="footer__col" aria-label="Shop">
            <span className="eyebrow">Shop</span>
            <ul className="footer__list">
              <li>
                <Link to="/shop" className="footer__link">
                  Shop All
                </Link>
              </li>
              {collections.map((collection) => (
                <li key={collection.id}>
                  <Link
                    to={`/shop?collection=${collection.id}`}
                    className="footer__link"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Company">
            <span className="eyebrow">Company</span>
            <ul className="footer__list">
              {COMPANY_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Account">
            <span className="eyebrow">Account</span>
            <ul className="footer__list">
              {ACCOUNT_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <span className="eyebrow">Elsewhere</span>
            <div className="footer__social">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="footer__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="footer__note">
            &copy; {new Date().getFullYear()} Otium Goods Co.
          </p>
          <p className="footer__note">
            Free shipping over $150 &middot; 30-day returns
          </p>
        </div>
      </div>
    </footer>
  );
}
