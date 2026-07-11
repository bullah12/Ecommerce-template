export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__logo">OTIUM</span>
        <p className="footer__note">
          Objects for a considered day. Made in small batches, shipped without
          hurry.
        </p>
        <p className="footer__note">
          &copy; {new Date().getFullYear()} Otium Goods Co.
        </p>
      </div>
    </footer>
  );
}
