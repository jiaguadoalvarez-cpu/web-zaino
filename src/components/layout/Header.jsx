import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/logo.jpg';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="header">
            <div className="container header-content">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="Zaino y Azabache" className="logo-img" />
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <Link to="/">Home</Link>
                    <Link to="/about">Quién soy</Link>
                    <Link to="/services">Servicios</Link>
                    <Link to="/gallery">Galería</Link>
                    <Link to="/contact">Contacto</Link>
                </nav>

                {/* Mobile Menu Button */}
                <button className="mobile-toggle" onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Nav */}
                {isOpen && (
                    <nav className="mobile-nav">
                        <Link to="/" onClick={toggleMenu}>Home</Link>
                        <Link to="/about" onClick={toggleMenu}>Quién soy</Link>
                        <Link to="/services" onClick={toggleMenu}>Servicios</Link>
                        <Link to="/gallery" onClick={toggleMenu}>Galería</Link>
                        <Link to="/contact" onClick={toggleMenu}>Contacto</Link>
                    </nav>
                )}
            </div>
            <style>{`
        .header {
          height: var(--header-height);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(5px);
          z-index: 100;
          display: flex;
          align-items: center;
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .logo-img {
          height: 50px; /* Adjust based on logo aspect ratio */
          width: auto;
          /* "Usar de forma sobria" - maybe grayscale or small */
        }
        .desktop-nav {
          display: none;
        }
        .desktop-nav a {
          margin-left: var(--spacing-md);
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          color: var(--color-text-light);
        }
        .desktop-nav a:hover {
          color: var(--color-text);
        }
        .mobile-toggle {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text);
        }
        .mobile-nav {
          position: absolute;
          top: var(--header-height);
          left: 0;
          width: 100%;
          background: white;
          border-bottom: 1px solid var(--color-border);
          padding: var(--spacing-md) 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .mobile-nav a {
          padding: var(--spacing-sm);
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
        }

        @media (min-width: 768px) {
          .desktop-nav {
            display: block;
          }
          .mobile-toggle {
            display: none;
          }
          .mobile-nav {
            display: none;
          }
        }
      `}</style>
        </header>
    );
};

export default Header;
