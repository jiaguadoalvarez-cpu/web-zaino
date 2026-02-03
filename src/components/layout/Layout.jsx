import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <footer className="footer text-center">
                <p>&copy; {new Date().getFullYear()} Zaino y Azabache Comunicación</p>
            </footer>
            <style>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .main-content {
          flex: 1;
        }
        .footer {
          padding: var(--spacing-md);
          font-size: 0.8rem;
          color: var(--color-text-light);
          border-top: 1px solid var(--color-border);
          margin-top: var(--spacing-xl);
        }
      `}</style>
        </div>
    );
};

export default Layout;
