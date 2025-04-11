import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
        <p>
          Built with ❤️ by <a href="https://github.com/" target="_blank" rel="noreferrer">YourName</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
