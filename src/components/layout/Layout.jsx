import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Instagram } from 'lucide-react';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer text-center">
        <div style={{ marginBottom: 'var(--spacing-sm)' }}>
          <a href="https://www.instagram.com/zainoyazabachecomunicacion/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Instagram size={18} /> <small>Instagram</small>
          </a>
        </div>
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
