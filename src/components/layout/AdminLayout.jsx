import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AdminLayout = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    if (loading) return <div>Cargando...</div>;
    if (!session) return <Navigate to="/login" />;

    return (
        <div className="admin-layout">
            <header className="admin-header">
                <div className="container header-content">
                    <span className="serif">Zaino y Azabache Admin</span>
                    <nav>
                        <Link to="/admin">Dashboard</Link>
                        <Link to="/" target="_blank">Ver Web</Link>
                        <button onClick={handleLogout} className="logout-btn">Salir</button>
                    </nav>
                </div>
            </header>
            <main className="container" style={{ paddingTop: 'var(--spacing-md)' }}>
                <Outlet />
            </main>
            <style>{`
        .admin-header {
          background: #f0f0f0;
          padding: 1rem 0;
          border-bottom: 1px solid var(--color-border);
        }
        .admin-header .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .admin-header nav {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .logout-btn {
          background: none;
          border: none;
          color: red;
          cursor: pointer;
          font-family: inherit;
          padding: 0.5rem;
          width: auto;
          margin-top: 0;
        }
      `}</style>
        </div>
    );
};

export default AdminLayout;
