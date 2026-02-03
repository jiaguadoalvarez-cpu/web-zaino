import React from 'react';
import { Link } from 'react-router-dom';
import { Folder, Image } from 'lucide-react';

const AdminDashboard = () => {
    return (
        <div>
            <h1 className="serif">Panel de Control</h1>
            <div className="admin-grid">
                <Link to="/admin/categories" className="admin-card">
                    <Folder size={32} />
                    <h3>Categorías</h3>
                    <p>Gestionar secciones de la web</p>
                </Link>
                <Link to="/admin/projects" className="admin-card">
                    <Image size={32} />
                    <h3>Proyectos</h3>
                    <p>Subir y editar portfolio</p>
                </Link>
            </div>
            <style>{`
        .admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-md);
          margin-top: var(--spacing-md);
        }
        .admin-card {
          border: 1px solid var(--color-border);
          padding: var(--spacing-md);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: var(--color-text);
          transition: background 0.2s;
        }
        .admin-card:hover {
          background: #f9f9f9;
        }
        .admin-card h3 {
          margin-top: var(--spacing-sm);
        }
        .admin-card p {
          font-size: 0.8rem;
          color: var(--color-text-light);
        }
      `}</style>
        </div>
    );
};

export default AdminDashboard;
