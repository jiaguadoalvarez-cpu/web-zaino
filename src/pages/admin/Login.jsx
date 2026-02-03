import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="serif text-center" style={{ marginBottom: 'var(--spacing-md)' }}>Admin Login</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
            <style>{`
        .login-container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f9f9f9;
        }
        .login-box {
          background: white;
          padding: var(--spacing-md);
          border: 1px solid var(--color-border);
          width: 100%;
          max-width: 400px;
        }
        .form-group {
          margin-bottom: var(--spacing-sm);
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--color-text-light);
        }
        .form-group input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid var(--color-border);
          font-family: inherit;
        }
        button {
          width: 100%;
          padding: 1rem;
          background-color: var(--color-text);
          color: white;
          border: none;
          cursor: pointer;
          margin-top: var(--spacing-sm);
        }
        button:disabled {
          background-color: var(--color-text-light);
        }
        .error-message {
          color: red;
          font-size: 0.8rem;
          margin-bottom: var(--spacing-sm);
        }
      `}</style>
        </div>
    );
};

export default Login;
